import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import {
	primaryButtonStyles,
	secondaryButtonStyles,
} from '@/constants/styles/buttonStyles'
import { ButtonProps } from '@/types/UI-types/UIComponentsProps'
import { twMerge } from 'tailwind-merge'

export const Button: React.FC<ButtonProps> = ({
	variant = STYLES_VARIANTS.PRIMARY,
	additionalStyles,
	...props
}) => {
	return (
		<button
			className={twMerge(`
				${
					variant === STYLES_VARIANTS.PRIMARY
						? primaryButtonStyles
						: secondaryButtonStyles
				}
				${additionalStyles}
				`)}
			{...props}
		/>
	)
}
