import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { TextAreaProps } from '@/types/UI-types/UIComponentsProps'
import { twMerge } from 'tailwind-merge'

export const TextArea = ({
	variant = STYLES_VARIANTS.PRIMARY,
	additionalStyles,
	...props
}: TextAreaProps) => {
	const baseStyles = `flex-1 m-0 py-5 px-4 max-w-2xl m-auto focus:outline-none focus:shadow-md resize-none leading-8 text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl  rounded-2xl xl:text-xl overflow-hidden`

	return (
		<textarea
			className={twMerge(`${baseStyles} ${additionalStyles}`)}
			{...props}
		/>
	)
}
