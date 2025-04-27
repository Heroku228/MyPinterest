'use client'

import { useChatData } from '@/hooks/context/chat/useChatData'
import { useEffect, useRef } from 'react'
import { MessageBlock } from './MessageBlock'

export const MessageList = () => {
	const { chatData, editing } = useChatData()

	const messageEndRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const prevLengthRef = useRef<number>(chatData.length)

	useEffect(() => {
		const isNewMessage = chatData.length > prevLengthRef.current

		if (isNewMessage && !editing && chatData.length > 3) {
			const container = containerRef.current

			window.scroll({
				top: container?.offsetHeight,
				behavior: 'smooth',
			})
		}

		prevLengthRef.current = chatData.length
	}, [chatData])

	return (
		<section
			ref={containerRef}
			className='w-full mb-8 mt-15 rounded-xl flex flex-col gap-8'
		>
			{chatData.map((message, key) => (
				<MessageBlock message={message} key={key} />
			))}

			<div className='mt-35' ref={messageEndRef}></div>
		</section>
	)
}
