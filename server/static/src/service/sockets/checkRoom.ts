import { SERVER_RESPONSE } from 'static/src/consts/enums/API-Response'
import { OPEN_ROOMS } from 'static/src/consts/enums/OpenRoomsEnum'
import { ISocketResponse } from 'static/src/types/socket/SocketsTypes'
import { socketErrorResponse, socketSuccessResponse } from './socketsResponse'

export const socketStatusConnect = (rooms: Set<string> | undefined, roomName: string): ISocketResponse => {
	console.log(' SOCKET STATUS CONNECT ROOMS :', rooms)
	if (!rooms) return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.ROOM_NOT_FOUND_ERROR, roomName)

	const maxUsers = parseInt(process.env.MAX_USERS_PEER_ROOM ?? '2', 10)
	const userCount = rooms.size

	if (roomName === OPEN_ROOMS.FIRST_ROOM) {
		return socketSuccessResponse({
			message: SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.CONNECTED_TO_SERVER,
			room: roomName,
			userCount: userCount
		})
	}

	validatedRoom(roomName)

	if (userCount >= maxUsers) return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.ROOM_IS_FULL, roomName)

	return socketSuccessResponse({
		message: SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.CONNECTED_TO_SERVER,
		userCount: userCount,
		room: roomName
	})
}

export const validatedRoom = (roomName: string) => {
	const validRooms = Object.values(OPEN_ROOMS).includes(roomName as OPEN_ROOMS)
	console.log('Validated RoomName: ', roomName)
	console.log('VALIDATED ROOM: ', validRooms)
	if (!validRooms) return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.NO_VALID_ROOMS, roomName)
}

