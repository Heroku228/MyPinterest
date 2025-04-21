'use client'

import { CheckIconForCopying } from '@/components/icons/CheckIconForCopying'
import { MessageText } from '@/components/ui/MessageText'
import { IMessage } from '@/types/ChatTypes/IChatData'
import Image from 'next/image'

export const MessageBlock = ({ message }: { message: IMessage }) => {
	return (
		<div className='relative p-3 w-max'>
			<div className='flex items-end gap-1'>
				<Image
					className='rounded-full cursor-pointer'
					src={message.sender.icon ? message.sender.icon : '/basicIcon.jpeg'}
					alt='user icon'
					width={45}
					height={45}
				/>
				<MessageText>{message.text}</MessageText>
			</div>
			<CheckIconForCopying message={message} />
		</div>
	)
}
