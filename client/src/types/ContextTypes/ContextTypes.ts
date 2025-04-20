import { Dispatch, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { IMessage } from '../ChatTypes/IChatData'
import { IUser } from '../IUser/IUser'
import { TSocketResponse } from '../SocketsTypes/TSocketResponse'


export namespace ContextTypes {
	export type TConnectChatProvider = {
		socket: Socket | null,
		isConnected: boolean,
		room: string
		handleRoom: (roomName: string) => Promise<TSocketResponse | unknown>
	}

	export type TUseChatDataProvider = {
		chatData: IMessage[]
		editing: boolean
		message: IMessage
		setChatData: Dispatch<SetStateAction<IMessage[]>>
		setEditing: Dispatch<SetStateAction<boolean>>
		setMessage: Dispatch<SetStateAction<IMessage>>
	}

	export type TUseMessageContext = {
		setMessage: Dispatch<SetStateAction<IMessage | undefined>>
		message: IMessage | undefined
	}

	export type TMessageContext = {
		message: string
		setMessage: (message: string) => void
		createdAt: Date
		isChanged?: boolean
		isSent: boolean
	}

	export type TRoomContext = {
		currentRoom: string | null
		setCurrentRoom: (room: string | null) => void
	}

	export type TUseEditMessageContext = {
		message: IMessage
		user: IUser
		isEdited: boolean
	}
}
