import {
	formIconStyles,
	formInputStyles,
} from '@/constants/styles/formInputStyles'
import { AuthTypes } from '@/types/AuthTypes/AuthTypes'
import { Input } from './Input'

export const AuthDiv = ({
	Image,
	inputProps,
	children,
}: AuthTypes.TAuthDiv) => {
	return (
		<div
			className={`relative ${formInputStyles} flex items-center gap-4 input-bold-border input-bold-border-focus rounded-md input-bg `}
		>
			<Image className={`${formIconStyles} text-gray-400 `} />
			<Input {...inputProps} />
			{children}
		</div>
	)
}
