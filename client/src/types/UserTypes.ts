
export namespace UserTypes {
	export type TResponseUserDto = {
		id: string
		username: string,
		email: string,
		userIconUrl: string,
		createdAt: string
	}

	export type TLoginDto = {
		emailOrUsername: string,
		password: string
	}

	export type TRegisterDto = {
		username: string,
		email: string,
		password: string,
		fileName: string
		userIconBase64: string,
	}

	export type TVisibleUserData = {
		showUsername: boolean,
		showEmail: boolean,
		showIcon: boolean,
		link?: string
		size: number
		additionalStyles?: string
	}

	export type TAnotherUserInfo = {
		userData: TResponseUserDto
	} & TVisibleUserData

	export type TFetchUserResponse = {
		access: boolean,
		status: number,
		statusText: string,
		headers: Object
		data: TResponseUserDto | null
		error?: any
	}
}

