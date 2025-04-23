
export type TSocketResponse = {
	status: RESPONSE_STATUS,
	statusCode: RESPONSE_STATUS_CODE,
	access: boolean,
	info: string
}

export enum RESPONSE_STATUS {
	ERROR = 'error',
	OK = 'ok'
}


export enum RESPONSE_STATUS_CODE {
	BAD_REQUEST = 400
}
