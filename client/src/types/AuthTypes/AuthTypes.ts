import { AxiosResponse } from 'axios'
import { LucideIcon } from 'lucide-react'
import { ReactNode, RefObject } from 'react'
import { TShowHint } from '../externalTypes/NextTypes'
import { InputProps } from '../UI-types/UIComponentsProps'
import { UserTypes } from '../UserTypes'

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
		login: (credentials: UserTypes.TLoginDto) => Promise<any>,
		register: (data: UserTypes.TRegisterDto) => Promise<void>,
		logout: () => Promise<AxiosResponse<any, any>>
		fetchUser: (username?: string) => Promise<void | AxiosResponse<any, any>>
	}
}

