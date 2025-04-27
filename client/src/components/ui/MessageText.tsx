import { MessageTextProps } from '@/types/UI-types/UIComponentsProps'
import React from 'react'

export const MessageText: React.FC<MessageTextProps> = ({ ...props }) => {
	return (
		<p
			{...props}
			className='text-white leading-8 sm:text-xl xl:text-2xl break-words relative text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-purple-500 max-w-[225px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px]'
		/>
	)
}
