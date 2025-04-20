import { IMessage } from '@/types/ChatTypes/IChatData'
import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'
import { Socket } from 'socket.io-client'

export const sendMessage = (socket: Socket, payload: IMessage) => {
	return new Promise<TSocketResponse>((resolve, reject) => {
		socket.emit('send-message', payload, (response: TSocketResponse) => {
			if (response) resolve(response)
			else reject(new Error('No response from server'))
		})
	})
}
