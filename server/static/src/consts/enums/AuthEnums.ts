export enum AUTH_RESPONSE_STATUS {
	ERROR = 'error',
	OK = 'ok',
}


export enum AUTH_RESPONSE_MESSAGE {
	SUCCESSFUL_AUTHORIZATION = 'successful authorization',
	AUTHORIZATION_ERROR = 'authorization error',
	NO_USER_DATA_FROM_REQUEST = 'no user data from request'
}


export enum AUTH_RESPONSE_ACCESS {
	NO_ENTRY_ALLOWED = 'no entry allowed',
	PASS_ALLOWED = 'pass allowed'
}
