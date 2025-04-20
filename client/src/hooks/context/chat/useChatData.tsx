import { sender } from '@/services/sockets/collectPayloadBody'
import { IMessage } from '@/types/ChatTypes/IChatData'
import { ContextTypes } from '@/types/ContextTypes/ContextTypes'
import { TReactNode } from '@/types/externalTypes/NextTypes'
import { createContext, useContext, useState } from 'react'

const UseChatDataContext = createContext<
	ContextTypes.TUseChatDataProvider | undefined
>(undefined)

export const UseChatDataProvider = ({ children }: TReactNode) => {
	const [chatData, setChatData] = useState<IMessage[]>([])
	const [editing, setEditing] = useState<boolean>(false)
	const [message, setMessage] = useState<IMessage>({
		messageId: '',
		text: '',
		room: 'Room#1',
		sender: sender,
	})

	return (
		<UseChatDataContext.Provider
			value={{
				chatData,
				setChatData,
				editing,
				setEditing,
				message,
				setMessage,
			}}
		>
			{children}
		</UseChatDataContext.Provider>
	)
}

export const useChatData = () => {
	const context = useContext(UseChatDataContext)

	if (!context)
		throw new Error('UseChatData must be used within an UseChatDataProvider')

	return context
}
