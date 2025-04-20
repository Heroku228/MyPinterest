import { MessageField } from '@/components/chatComponents/messages/MessageField'
import { useChatData } from '@/hooks/context/chat/useChatData'
import {
	cleanText,
	collectMessage,
	splitMessageIntoSeveralParts,
	wordsInText,
} from '@/services/chatService/chatService'
import { handleSendPayload } from '@/services/sockets/messageHandler/handleSendPayload'
import { IMessage } from '@/types/ChatTypes/IChatData'
import { useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { MessageList } from './MessageList'

export const MessageWrapper = ({
	socket,
	room,
}: {
	socket: Socket
	room: string
}) => {
	const { setChatData, setEditing, editing, message, setMessage } =
		useChatData()

	const [text, setText] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<Record<number, string>>()

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
		const collectedMessage = collectMessage(cleanedText, room)

		if (editing && newMessage && message) {
			const updatedMessage: IMessage = { ...message, text: newMessage }
			setChatData(prev =>
				prev.map(el =>
					el.messageId === message.messageId ? updatedMessage : el
				)
			)
			await handleSendPayload(updatedMessage, socket)
			setEditing(false)
			setText('')
			return
		}

		const splitedMessages = splitMessageIntoSeveralParts(collectedMessage)

		if (!splitedMessages) return

		for (const el of splitedMessages) {
			setChatData(prev => [...prev, el])
			await handleSendPayload(el, socket)
		}

		setEditing(false)
		setText('')
		return
	}

	return (
		<div className='col-span-4 rounded-xl ml-10 relative'>
			<MessageList />
			<MessageField handleChange={handleChange} onSend={onSend} />
		</div>
	)
}
