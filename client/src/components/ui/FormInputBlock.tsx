import {
	formIconStyles,
	formInputStyles,
} from '@/constants/styles/formInputStyles'
import { AuthTypes } from '@/types/AuthTypes/AuthTypes'
import { twMerge } from 'tailwind-merge'
import { Input } from './Input'

export const AuthDiv = ({
	Image,
	inputProps,
	children,
}: AuthTypes.TAuthDiv) => {
	return (
		<div
			className={twMerge(
				`relative ${formInputStyles} flex items-center gap-4 input-bold-border input-bold-border-focus rounded-md input-bg`
			)}
		>
			<Image className={twMerge(`${formIconStyles} text-gray-400 `)} />
			<Input {...inputProps} />
			{children}
		</div>
	)
}
