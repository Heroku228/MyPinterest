import { Socket } from 'socket.io-client'
import { IUser } from '../IUser/IUser'

export interface IChatData {
	messages: IMessage[],
	sender: IUser,
	room: string,
}

export type TCollectPayloadData = {
	message: IMessage
	room: string
	sender: IUser
}

export interface IMessage {
	messageId: string,
	text: string
	room: string
	sender: IUser | null
	userCount?: number
	sentTo?: string,
	editedMessage?: boolean
}

export type TMessageField = {
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>, editing: boolean) => void
	onSend: (newMessage?: string) => Promise<void>
}

export type TRoomConnectProps = {
	socket: Socket | null
	room: string
	handleRoom: (roomName: string) => void
}
