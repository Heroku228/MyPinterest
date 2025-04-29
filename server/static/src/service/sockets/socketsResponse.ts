import { BadRequestException } from '@nestjs/common'
import { SERVER_RESPONSE } from 'static/src/consts/enums/API-Response'
import { ISocketResponse, SocketSuccessParams } from 'static/src/types/socket/SocketsTypes'

export const socketSuccessResponse = ({ userCount, message, room }: SocketSuccessParams): ISocketResponse => {
	if (!message) throw new BadRequestException('[SocketSuccess] (message): Message is undefined!')
	if (!userCount) throw new BadRequestException('[SocketSuccess] (userCount): UserCount is undefined!')
	if (!room) throw new BadRequestException('[SocketSuccess] (room): Room is undefined!')

	return {
		status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.OK,
		access: SERVER_RESPONSE.SOCKET_RESPONSE_ACCESS.PASS_ALLOWED,
		info: {
			message: message,
			room: room,
			...(userCount !== undefined && { userCount }),
		}
	}
}

export const socketErrorResponse = (message: SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE, room: string): ISocketResponse => ({
	status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.ERROR,
	access: SERVER_RESPONSE.SOCKET_RESPONSE_ACCESS.NO_ENTRY_ALLOWED,
	info: {
		message: message,
		room: room
	}
})
