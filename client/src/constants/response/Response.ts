import { RESPONSE_STATUS, RESPONSE_STATUS_CODE, TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'

export const SOCKET_NOT_FOUND: TSocketResponse = {
	access: false,
	status: RESPONSE_STATUS.ERROR,
	statusCode: RESPONSE_STATUS_CODE.BAD_REQUEST,
	info: 'Socket not found'
}
