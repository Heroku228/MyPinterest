import { useChatData } from '@/hooks/context/chat/useChatData'
import { useEffect, useRef } from 'react'
import { MessageBlock } from './MessageBlock'

export const MessageList = () => {
	const { chatData, editing } = useChatData()

	const messageEndRef = useRef<HTMLDivElement>(null)
	const prevLengthRef = useRef<number>(chatData.length)

	useEffect(() => {
		const isNewMessage = chatData.length > prevLengthRef.current

		if (chatData.length > 2 && isNewMessage && !editing)
			messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		
		prevLengthRef.current = chatData.length
	}, [chatData])

	return (
		<section className='w-full mb-8 mt-15 rounded-xl flex flex-col gap-8 min-h-screen'>
			{chatData.map((message, key) => (
				<MessageBlock message={message} key={key} />
			))}

			<div className='mt-35' ref={messageEndRef}></div>
		</section>
	)
}
