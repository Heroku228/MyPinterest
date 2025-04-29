import { ISocketResponse } from 'static/src/types/socket/SocketsTypes'
import { TPayloadBody } from 'static/src/types/socket/TPayloadBody'
import { socketErrorResponse } from './socketsResponse'
import { SERVER_RESPONSE } from 'static/src/consts/enums/API-Response'

export const checkPayload = (payload: TPayloadBody): ISocketResponse | undefined => {
	if (!payload)
		return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.NO_PAYLOAD_DATA, '')

	console.log('PAYLOAD: ', payload)

	if (!payload.room)
		return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.ROOM_NOT_FOUND_ERROR, payload.room)

	if (!payload.text)
		return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.MESSAGE_IS_NULL, payload.room)

	if (!payload.sender)
		return socketErrorResponse(SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE.SENDER_IS_NULL_ERROR, payload.room)
}
