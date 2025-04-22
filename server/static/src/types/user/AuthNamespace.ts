import { AUTH_RESPONSE_ACCESS, AUTH_RESPONSE_MESSAGE, AUTH_RESPONSE_STATUS } from 'static/src/consts/enums/AuthEnums'
import { IUser } from '../socket/TPayloadBody'

export namespace AuthTypes {
	export interface IAuthResponse {
		access: AUTH_RESPONSE_ACCESS,
		message: AUTH_RESPONSE_MESSAGE,
		status: AUTH_RESPONSE_STATUS
		data?: IResponseDTO 
	}

	interface IResponseDTO {
		
	}
}
