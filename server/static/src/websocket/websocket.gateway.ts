import { Inject, Logger, NotFoundException } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import Redis from 'ioredis'
import { Server, Socket } from 'socket.io'
import { OPEN_ROOMS } from '../consts/enums/OpenRoomsEnum'
import { SocketResponse } from '../consts/enums/SocketResponse'
import { checkPayload } from '../service/sockets/checkPayload'
import { socketStatusConnect } from '../service/sockets/checkRoom'
import { socketErrorResponse, socketSuccessResponse } from '../service/sockets/socketsResponse'
import { ISocketResponse } from '../types/socket/SocketsTypes'
import { TPayloadBody } from '../types/socket/TPayloadBody'

@WebSocketGateway({
	cors: {
		origin: true,
		credentials: true
	}
})

export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server

	private readonly logger = new Logger(WebSocketGateway.name)

	constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) { }

	afterInit(server: Server) {
		console.log('WebsocketGateway initialized')
	}

	async handleConnection(client: Socket, ...args: any[]) {
		console.log('CLIENT: ', client.id)

		const userId = client.id
		this.logger.log(`User ${userId}`, '1')

		await this.redis.set(`online:${userId}`, '1')
		await this.redis.expire(`online:${userId}`, 60)

		const stillOnline = await this.redis.get(`online:${userId}`)
		this.logger.log(`User ${userId} online status: ${stillOnline}`)
	}

	handleDisconnect(client: Socket) {
		console.log('Client disconnected: ', client.id)
		const userId = client.id

		setTimeout(async () => {
			const stillOnline = await this.redis.get(`online:${userId}`)
			this.logger.log(`User ${userId} online status: ${stillOnline}`)
		}, 10000)
	}

	@SubscribeMessage('ping')
	handlePing(@ConnectedSocket() client: Socket) {
		const userId = client.id
		this.redis.expire(`online:${userId}`, 60)
	}

	@SubscribeMessage('send-message')
	async handleSentMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: TPayloadBody): Promise<ISocketResponse> {
		const isHasError = checkPayload(payload)
		if (isHasError) return isHasError

		const rooms = this.server.sockets.adapter.rooms.get(payload.room)
		if (!rooms) throw new NotFoundException('[handleLeaveRoom] (rooms) Rooms is undefined')

		return socketSuccessResponse({
			message: SocketResponse.SOCKET_RESPONSE_MESSAGE.MESSAGE_SENT_SUCCESSFULLY,
			room: payload.room,
			userCount: rooms?.size
		})
	}

	@SubscribeMessage('leave-room')
	async handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomName: string) {
		const rooms = this.server.sockets.adapter.rooms.get(roomName)

		if (!rooms) throw new NotFoundException('[handleLeaveRoom] (rooms) Rooms is undefined')

		const { status, info } = socketStatusConnect(rooms, roomName)

		await client.leave(roomName)
		return socketSuccessResponse({
			message: SocketResponse.SOCKET_RESPONSE_MESSAGE.EXIT_FROM_ROOM,
			room: roomName,
			userCount: rooms?.size
		})
	}

	@SubscribeMessage('join-room')
	async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomName: string): Promise<ISocketResponse> {
		if (!roomName) return socketErrorResponse(SocketResponse.SOCKET_RESPONSE_MESSAGE.ROOM_NOT_FOUND_ERROR, roomName)

		const validRooms = Object.values(OPEN_ROOMS).includes(roomName as OPEN_ROOMS)
		if (!validRooms) return socketErrorResponse(SocketResponse.SOCKET_RESPONSE_MESSAGE.NO_VALID_ROOMS, roomName)

		await client.join(roomName)
		const room = this.server.sockets.adapter.rooms.get(roomName)
		client.to(roomName).emit('user-joined', client.id)
		return socketStatusConnect(room, roomName)
	}
}
