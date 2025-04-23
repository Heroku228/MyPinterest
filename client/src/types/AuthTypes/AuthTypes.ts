import { LucideIcon } from 'lucide-react'
import { ReactNode, RefObject } from 'react'
import { InputProps } from '../UI-types/UIComponentsProps'
import { TShowHint } from '../externalTypes/NextTypes'

export namespace AuthTypes {
	export type TAuthDiv = {
		Image: LucideIcon
		inputProps: InputProps
		children?: ReactNode
	}

	export type TRegisterParams = {
		usernameRef: RefObject<HTMLInputElement | null>
		emailRef: RefObject<HTMLInputElement | null>
		passwordRef: RefObject<HTMLInputElement | null>
		userIconRef: RefObject<HTMLInputElement | null>
		register: (data: UserTypes.TRegisterDto) => Promise<void>
		error: boolean
	}

	export type TAuthHint = {
		hint: TShowHint,
		message: string,
		link: string
	}

	export interface IAuthContextType {
		user: UserTypes.TResponseUserDto | null,
		isAuthenticated: boolean,
		isLoading: boolean,
		login: (credentials: UserTypes.TLoginDto) => Promise<void>,
		register: (data: UserTypes.TRegisterDto) => Promise<void>,
		logout: () => void
		fetchUser: () => Promise<void>
	}
}

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
}

