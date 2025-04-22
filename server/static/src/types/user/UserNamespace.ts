export namespace UserTypes {
	export interface IUserResponseDTO {
		username: string
		email: string
		userIconUrl: string
		isBanned: boolean
		isBlocked: boolean
		isStatusExpired: boolean
	}

	export interface IUserRequestDTO {

	}
}
