import { Socket } from 'socket.io-client'
import { UserTypes } from '../AuthTypes/AuthTypes'

export interface IChatData {
	messages: IMessage[],
	sender: UserTypes.TResponseUserDto,
	room: string,
}

export interface IMessage {
	messageId: string,
	text: string
	room: string
	sender: UserTypes.TResponseUserDto | null
	userCount?: number
	sentTo?: string,
	editedMessage?: boolean
}

export type TMessageField = {
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>, editing: boolean) => void
	onSend: (newMessage?: string) => Promise<void>
}
