import { MessageTextProps } from '@/types/UI-types/UIComponentsProps'
import React from 'react'

export const MessageText: React.FC<MessageTextProps> = ({ ...props }) => {
	return (
		<p
			{...props}
			style={{ fontSize: '16px' }}
			className='text-white font-medium leading-5 sm:text-lg break-words relative text-white px-4 py-2 rounded-xl max-w-xl shadow-md bg-gradient-to-r from-blue-600 via-purple-500 to-purple-500'
		/>
	)
}
