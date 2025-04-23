'use client'

import { CheckIconForCopying } from '@/components/chatComponents/CheckIconForCopying'
import { MessageText } from '@/components/ui/MessageText'
import { useAuth } from '@/hooks/context/user/useAuth'
import { IMessage } from '@/types/ChatTypes/IChatData'
import Image from 'next/image'

export const MessageBlock = ({ message }: { message: IMessage }) => {
	const { user } = useAuth()

	return (
		<div className='relative p-3 w-max'>
			<div className='flex items-end gap-2'>
				<div className='relative w-[50px] h-[50px]'>
					<Image
						className='rounded-full cursor-pointer'
						src={`http://127.0.0.1:3000/api/v1/uploads/avatars/${user?.userIconUrl}`}
						alt='user icon'
						fill
					/>
				</div>
				<MessageText>{message.text}</MessageText>
			</div>
			<CheckIconForCopying message={message} />
		</div>
	)
}
