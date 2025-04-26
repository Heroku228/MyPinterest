import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import {
	basicInputStyles,
	primaryInputStyles,
	secondaryInputStyles,
} from '@/constants/styles/formInputStyles'
import { InputProps } from '@/types/UI-types/UIComponentsProps'
import { twMerge } from 'tailwind-merge'

export const Input: React.FC<InputProps> = ({
	additionalStyles,
	variant,
	...props
}) => {
	return (
		<input
			className={twMerge(`
				${basicInputStyles}
				${
					variant === STYLES_VARIANTS.PRIMARY
						? primaryInputStyles
						: secondaryInputStyles
				}
				${additionalStyles}
				`)}
			{...props}
		/>
	)
}
