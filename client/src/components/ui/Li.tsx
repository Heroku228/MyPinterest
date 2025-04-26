import { LiProps } from '@/types/UI-types/UIComponentsProps'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export const LiItem: React.FC<LiProps> = ({ additionalStyles, ...props }) => {
	return (
		<li
			className={twMerge(
				`flex justify-center cursor-pointer w-max text-xl font-bold transition-color duration-300 hover:text-purple-400 ${additionalStyles}`
			)}
			{...props}
		/>
	)
}
