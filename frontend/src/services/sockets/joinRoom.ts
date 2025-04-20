import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'
import { Socket } from 'socket.io-client'

export const joinRoom = (socket: Socket, room: string) => {
	return new Promise<TSocketResponse>((resolve, reject) => {
		socket.emit('join-room', room, (response: TSocketResponse) => {
			if (!room) return new Error('Room not found')

			if (response.status === 'error') reject(response)
			else resolve(response)
		})
	})
}
