'use client'

import { MessageField } from '@/components/chatComponents/messages/MessageField'
import { Loader } from '@/components/ui/Loader'
import { ROOMS } from '@/constants/enums/Rooms'
import { useChatData } from '@/hooks/context/chat/useChatData'
import { useAuth } from '@/hooks/context/user/useAuth'
import {
	cleanText,
	splitMessageIntoSeveralParts,
	wordsInText,
} from '@/services/chatService/chatService'
import { sendMessage } from '@/services/socketService/socketService'
import { IMessage } from '@/types/ChatTypes/IChatData'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

const MessageList = dynamic(
	() => import('./MessageList').then(mod => mod.MessageList),
	{
		loading: () => <Loader />,
	}
)

export const MessageWrapper = ({
	socket,
	room,
}: {
	socket: Socket
	room: string
}) => {
	const { setChatData, setEditing, editing, message } = useChatData()
	const { user } = useAuth()

	const [text, setText] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<Record<
		string,
		boolean
	> | null>(null)

	const isCooldown = useRef(false)

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = event.target.value
		setText(text)
	}

	const onSend = async (newMessage?: string) => {
		const [, length] = wordsInText(text)

		if (text.length >= 1000) throw new Error('Hes is so big')
		if (length >= 150) throw new Error('Hes is so big')

		if (isCooldown.current) return
		isCooldown.current = true

		setTimeout(() => {
			isCooldown.current = false
		}, 300)

		const cleanedText = cleanText(text)
		const collectedMessage: IMessage = {
			messageId: uuidv4(),
			text: cleanedText,
			room: room ?? ROOMS[0].name,
			sender: user,
		}

		if (editing && newMessage && message) {
			const updatedMessage: IMessage = { ...message, text: newMessage }
			setChatData(prev =>
				prev.map(el =>
					el.messageId === message.messageId ? updatedMessage : el
				)
			)
			await sendMessage(socket, updatedMessage)
			setEditing(false)
			setText('')
			return
		}

		const splitedMessages = splitMessageIntoSeveralParts(collectedMessage)

		if (!splitedMessages) return

		for (const el of splitedMessages) {
			setChatData(prev => [...prev, el])
			await sendMessage(socket, el)
		}

		setEditing(false)
		setText('')
		return
	}

	return (
		<div className='col-span-4 relative'>
			<MessageList />
			<MessageField handleChange={handleChange} onSend={onSend} />
		</div>
	)
}
