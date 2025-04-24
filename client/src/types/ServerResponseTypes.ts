import { HTTP_STATUS, RESPONSE_STATUS, } from './Response'

export namespace ServerResponse {
	export interface IGetUserResponse {
		access: boolean,
		status: RESPONSE_STATUS,
		statusCode: HTTP_STATUS,
		message: string,
		userData: {
			username: string,
			email: string,
			userIconUrl: string,
			createdAt: string,
			updatedAt: string,
			isBanned: false,
			isBlocked: false,
			isStatusExpired: false,
		}
	}
}


