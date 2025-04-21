'use client'

import { useChatData } from '@/hooks/context/chat/useChatData'
import { IMessage } from '@/types/ChatTypes/IChatData'
import { Check, Copy, Edit } from 'lucide-react'
import { useState } from 'react'

export const CheckIconForCopying = ({ message }: { message: IMessage }) => {
	const [copied, setCopied] = useState<Record<string, boolean>>({})

	const { setEditing, setMessage } = useChatData()

	const handleCopyMessage = async (message: IMessage, messageId: string) => {
		try {
			await navigator.clipboard.writeText(message.text)
			setCopied(prev => ({ ...prev, [messageId]: true }))
			setTimeout(() => {
				setCopied(prev => ({ ...prev, [messageId]: false }))
			}, 3000)
		} catch (err) {
			console.error('ERROR: ', err)
		}
	}

	return (
		<div className='relative'>
			<div
				className={`absolute right-0 top-4 -translate-y-1/2 flex gap-1 transition-opacity duration-200 `}
			>
				{copied[message.messageId] ? (
					<Check
						className='text-white cursor-pointer border border-transparent rounded-md p-1 transition-transform duration-300 set-white-ring-80'
						size={message.text.length < 100 ? 25 : 30}
					/>
				) : (
					<Copy
						onClick={() => handleCopyMessage(message, message.messageId)}
						size={message.text.length < 100 ? 25 : 30}
						className='text-white cursor-pointer border border-transparent rounded-md p-1 transition-transform duration-300 set-white-ring-80'
					/>
				)}
				<Edit
					onClick={() => {
						message.editedMessage = true
						console.log(message)
						setEditing(true)
						setMessage(message)
					}}
					size={message.text.length < 100 ? 25 : 30}
					className='text-white cursor-pointer border border-transparent rounded-md p-1 transition-transform duration-300 set-white-ring-80'
				/>
			</div>
		</div>
	)
}
