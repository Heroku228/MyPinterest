import { IMessage } from '@/types/ChatTypes/IChatData'
import { Socket } from 'socket.io-client'
import { sendMessage } from './sendMessage'

export const handleSendPayload = async (data: IMessage, socket: Socket) => {
	// ! badwords

	return await sendMessage(socket, data)
}
