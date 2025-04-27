'use client'

import { MessageField } from '@/components/chatComponents/messages/MessageField'
import { Loader } from '@/components/ui/Loader'
import { ROOMS } from '@/constants/enums/Rooms'
import { useChatData } from '@/hooks/context/chat/useChatData'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useWindowSize } from '@/hooks/useWindowSize'
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
	const { width } = useWindowSize()

	const [text, setText] = useState<string>('')
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const isCooldown = useRef(false)

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = event.target.value

		if (text.length >= 1000 || length >= 150) {
			setErrorMessage('The message is very big')
			setShowError(true)
			return
		}
		setShowError(false)
		setText(text)
	}

	const onSend = async (newMessage?: string) => {
		const [, length] = wordsInText(text)

		if (text.length >= 1000 || length >= 150) {
			setShowError(true)
			setErrorMessage('The message is very big')
			return
		}

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

		if (editing && newMessage && message && !showError) {
			const updatedMessage: IMessage = { ...message, text: newMessage }
			setChatData(prev =>
				prev.map(el =>
					el.messageId === message.messageId ? updatedMessage : el
				)
			)
			await sendMessage(socket, updatedMessage)
			setEditing(false)
			setText('')
			setShowError(false)
			return
		}

		const splitedMessages = splitMessageIntoSeveralParts(collectedMessage)

		if (!splitedMessages) return
		if (showError) {
			setShowError(false)
			return
		}

		for (const el of splitedMessages) {
			setChatData(prev => [...prev, el])
			await sendMessage(socket, el)
		}

		setEditing(false)
		setShowError(false)
		setText('')
		return
	}

	return (
		<div
			className={`
			flex justify-center mx-auto items-center overflow-x-hidden
			${width < 680 ? 'w-full' : 'w-2/4'}
		`}
		>
			<MessageList />
			<MessageField
				errorMessage={errorMessage}
				handleChange={handleChange}
				onSend={onSend}
				showError={showError}
			/>
		</div>
	)
}
