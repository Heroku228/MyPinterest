import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import {
	primaryButtonStyles,
	secondaryButtonStyles,
} from '@/constants/styles/buttonStyles'
import { ButtonProps } from '@/types/UI-types/UIComponentsProps'

export const Button: React.FC<ButtonProps> = ({
	variant = STYLES_VARIANTS.PRIMARY,
	additionalStyles,
	...props
}) => {
	return (
		<button
			className={`
				${
					variant === STYLES_VARIANTS.PRIMARY
						? primaryButtonStyles
						: secondaryButtonStyles
				}
				${additionalStyles}
				`}
			{...props}
		/>
	)
}
