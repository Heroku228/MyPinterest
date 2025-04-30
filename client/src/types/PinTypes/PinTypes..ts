import { UserTypes } from '../UserTypes'

export namespace PinTypes {
	export interface IPin {
		author: UserTypes.TResponseUserDto | null,
		url: string,
		title: string,
		link?: string,
		description: string,
		isCensor?: boolean,
		isBanned?: boolean,
		isPopular?: boolean,
		isHidden?: boolean
	}
}
