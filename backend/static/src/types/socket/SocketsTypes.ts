import { SocketResponse } from 'static/src/consts/enums/SocketResponse'

export interface ISocketResponse {
	status: SocketResponse.SOCKET_RESPONSE_STATUS
	access: SocketResponse.SOCKET_RESPONSE_ACCESS
	info: TSocketInfo
}

type TSocketInfo = {
	message: SocketResponse.SOCKET_RESPONSE_MESSAGE
	userCount?: number
	room: string
}

export type TCheckedPayload = {
	access: boolean
}

export type SocketSuccessParams = {
	userCount: number,
	room: string,
	message: SocketResponse.SOCKET_RESPONSE_MESSAGE
}
