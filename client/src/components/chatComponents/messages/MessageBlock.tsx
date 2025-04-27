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
	const [anonymousIcon, setAnonymousIcon] = useState<string | null>(null)

	useEffect(() => {
		if (!isAuthenticated) {
			setAnonymousIcon('/anonymousIcon.jpg')
		}
	}, [isAuthenticated])

	return (
		<div className='relative p-3 w-max'>
			<div className='flex items-end gap-4 text-2xl'>
				<div className='relative w-[50px] h-[50px]'>
					<Image
						unoptimized
						className='rounded-full cursor-pointer'
						src={`${
							isAuthenticated
								? UPLOADS.AVATARS.concat(user?.userIconUrl as string)
								: anonymousIcon
						}`}
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
