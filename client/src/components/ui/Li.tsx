import { LiProps } from '@/types/UI-types/UIComponentsProps'
import React from 'react'

export const LiItem: React.FC<LiProps> = ({ ...props }) => {
	return (
		<li
			className='cursor-pointer text-lg font-bold transition-color duration-300 hover:text-purple-400'
			{...props}
		/>
	)
}
