import { IMessage } from '../ChatTypes/IChatData'

export type TSocketResponse = {
	status: RESPONSE_STATUS,
	access: string,
	info: IMessage
}

export enum RESPONSE_STATUS {
	ERROR = 'error',
	OK = 'ok'
}
