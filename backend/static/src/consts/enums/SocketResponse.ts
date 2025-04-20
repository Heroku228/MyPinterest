export namespace SocketResponse {
	export enum SOCKET_RESPONSE_STATUS {
		ERROR = 'error',
		OK = 'ok',
	}

	export enum SOCKET_RESPONSE_MESSAGE {
		CONNECTED_TO_SERVER = 'connected to server',
		CONNECTED_TO_ROOM = 'connected to room',
		EXIT_FROM_ROOM = 'exit from room',
		MESSAGE_SENT_SUCCESSFULLY = 'message sent successfully',
		MESSAGE_IS_NULL = 'message is null',
		SENDER_IS_NULL_ERROR = 'sender is null error',
		ROOM_NOT_FOUND_ERROR = 'room not found error',
		ROOM_IS_FULL = 'room is full',
		NO_VALID_ROOMS = 'no valid rooms',
		NO_PAYLOAD_DATA = 'no payload data',
	}

	export enum SOCKET_RESPONSE_ACCESS {
		NO_ENTRY_ALLOWED = 'no entry allowed',
		PASS_ALLOWED = 'pass allowed'
	}
}


