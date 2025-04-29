export namespace SERVER_RESPONSE {
	export const SERVER_RESPONSE_STATUS = {
		ERROR: 'error',
		OK: 'ok',
	} as const



	export const SERVER_RESPONSE_MESSAGE = {
		PIN_CREATED_SUCCESSFULLY: 'pin created successfully',
		NO_PAYLOAD_DATA: 'no payload data',
		USER_NOT_AUTHENTICATED: 'user not authenticated',
		NO_VALID_DATA: 'no valid data',
		NO_PIN_IMAGE: 'pin image not found'
	} as const

	export const SOCKET_RESPONSE_MESSAGE = {
		CONNECTED_TO_SERVER: 'connected to server',
		CONNECTED_TO_ROOM: 'connected to room',
		EXIT_FROM_ROOM: 'exit from room',
		MESSAGE_SENT_SUCCESSFULLY: 'message sent successfully',
		MESSAGE_IS_NULL: 'message is null',
		SENDER_IS_NULL_ERROR: 'sender is null error',
		ROOM_NOT_FOUND_ERROR: 'room not found error',
		ROOM_IS_FULL: 'room is full',
		NO_VALID_ROOMS: 'no valid rooms',
		NO_PAYLOAD_DATA: 'no payload data',
	} as const

	export const SOCKET_RESPONSE_ACCESS = {
		NO_ENTRY_ALLOWED: 'no entry allowed',
		PASS_ALLOWED: 'pass allowed'
	} as const


	export type SERVER_RESPONSE_STATUS = typeof SERVER_RESPONSE_STATUS[keyof typeof SERVER_RESPONSE_STATUS]
	export type SOCKET_RESPONSE_ACCESS = typeof SOCKET_RESPONSE_ACCESS[keyof typeof SOCKET_RESPONSE_ACCESS]
	export type SOCKET_RESPONSE_MESSAGE = typeof SOCKET_RESPONSE_MESSAGE[keyof typeof SOCKET_RESPONSE_MESSAGE]
}

