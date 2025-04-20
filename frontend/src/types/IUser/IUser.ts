import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface IUser {
	username: string,
	email: string,
	icon: string | StaticImport
	online: boolean
	language: string
}
