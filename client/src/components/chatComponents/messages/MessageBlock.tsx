'use client'

import { CheckIconForCopying } from '@/components/chatComponents/CheckIconForCopying'
import { MessageText } from '@/components/ui/MessageText'
import { UPLOADS } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { IMessage } from '@/types/ChatTypes/IChatData'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const MessageBlock = ({ message }: { message: IMessage }) => {
	const { user, isAuthenticated } = useAuth()
	const [anonymousImage, setAnonymousImage] = useState<string | null>(null)

	useEffect(() => {
		if (!isAuthenticated) {
		}
	}, [isAuthenticated])

	return (
		<div className='relative p-3 w-max'>
			<div className='flex items-end gap-2'>
				<div className='relative w-[50px] h-[50px]'>
					<Image
						unoptimized
						className='rounded-full cursor-pointer'
						src={`${UPLOADS.AVATARS}${user?.userIconUrl}`}
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
