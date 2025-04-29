import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { HTTP_STATUS, RESPONSE_STATUS, } from '@/types/Response'
import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'

export const SOCKET_NOT_FOUND: TSocketResponse = {
	access: false,
	status: RESPONSE_STATUS.ERROR,
	statusCode: HTTP_STATUS.BAD_REQUEST,
	info: 'Socket not found'
}


export const FOUNDED_USER = {
	access: true,
	status: RESPONSE_STATUS.OK,
	statusCode: HTTP_STATUS.OK,
}

export const emptyPin = (field: keyof PinTypes.IPin, value: string) => ({
	author: {
		id: '',
		username: '',
		createdAt: '',
		email: '',
		userIconUrl: '',
	},
	description: '',
	title: '',
	link: '',
	url: '',
	[field]: value,
}) as PinTypes.IPin
