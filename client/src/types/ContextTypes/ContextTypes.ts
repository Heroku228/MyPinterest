import { Dispatch, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { IMessage } from '../ChatTypes/IChatData'
import { PinTypes } from '../PinTypes/PinTypes.'
import { TSocketResponse } from '../SocketsTypes/TSocketResponse'


export namespace ContextTypes {
	export type TConnectServerProvider = {
		socket: Socket | null,
		isConnected: boolean,
		room: string
		handleRoom: (roomName: string) => Promise<TSocketResponse | unknown>
	}


	export type TUsePin = {
		pin: PinTypes.IPin | null,
		setPin: Dispatch<SetStateAction<PinTypes.IPin | null>>
	}

	export type TUseChatDataProvider = {
		chatData: IMessage[]
		editing: boolean
		message: IMessage
		setChatData: Dispatch<SetStateAction<IMessage[]>>
		setEditing: Dispatch<SetStateAction<boolean>>
		setMessage: Dispatch<SetStateAction<IMessage>>
	}

	export type TMessageContext = {
		message: string
		setMessage: (message: string) => void
		createdAt: Date
		isChanged?: boolean
		isSent: boolean
	}
}
