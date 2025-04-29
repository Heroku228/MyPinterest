
import { SERVER_RESPONSE } from 'static/src/consts/enums/API-Response'

export interface ISocketResponse {
	status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS
	access: SERVER_RESPONSE.SOCKET_RESPONSE_ACCESS
	info: TSocketInfo
}

type TSocketInfo = {
	message: SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE
	userCount?: number
	room: string
}

export type TCheckedPayload = {
	access: boolean
}

export type SocketSuccessParams = {
	userCount: number,
	room: string,
	message: SERVER_RESPONSE.SOCKET_RESPONSE_MESSAGE
}
