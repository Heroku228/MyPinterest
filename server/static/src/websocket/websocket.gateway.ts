import { NotFoundException } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
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
		origin: '*',
		methods: ['GET', 'POST']
	}
})

export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server

	afterInit(server: Server) {
		console.log('WebsocketGateway initialized')
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log('CLIENT ID: ', client.id, ' CONNECTED')
	}

	handleDisconnect(client: Socket) {
		console.log('Client disconnected: ', client.id)
	}


	@SubscribeMessage('connection-confirmed')
	handleConfirmedConnection() {

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
