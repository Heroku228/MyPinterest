import { BadRequestException } from '@nestjs/common'
import { SocketResponse } from 'static/src/consts/enums/SocketResponse'
import { ISocketResponse, SocketSuccessParams } from 'static/src/types/socket/SocketsTypes'

export const socketSuccessResponse = ({ userCount, message, room }: SocketSuccessParams): ISocketResponse => {
	if (!message) throw new BadRequestException('[SocketSuccess] (message): Message is undefined!')
	if (!userCount) throw new BadRequestException('[SocketSuccess] (userCount): UserCount is undefined!')
	if (!room) throw new BadRequestException('[SocketSuccess] (room): Room is undefined!')

	return {
		status: SocketResponse.SOCKET_RESPONSE_STATUS.OK,
		access: SocketResponse.SOCKET_RESPONSE_ACCESS.PASS_ALLOWED,
		info: {
			message: message,
			room: room,
			...(userCount !== undefined && { userCount }),
		}
	}
}

export const socketErrorResponse = (message: SocketResponse.SOCKET_RESPONSE_MESSAGE, room: string): ISocketResponse => ({
	status: SocketResponse.SOCKET_RESPONSE_STATUS.ERROR,
	access: SocketResponse.SOCKET_RESPONSE_ACCESS.NO_ENTRY_ALLOWED,
	info: {
		message: message,
		room: room
	}
})
