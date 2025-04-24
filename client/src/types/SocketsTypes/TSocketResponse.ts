import { RESPONSE_STATUS, RESPONSE_STATUS_CODE } from '../Response'

export type TSocketResponse = {
	status: RESPONSE_STATUS,
	statusCode: RESPONSE_STATUS_CODE,
	access: boolean,
	info: string
}
