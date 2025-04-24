import { IMessage } from '@/types/ChatTypes/IChatData'
import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'
import { useCallback, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const setSocket = (socketUrl: string) => {
	console.log("SET SOCKET FUNCTION")
	const socketRef = useRef<Socket | null>(null)
	const [isConnected, setIsConnected] = useState<boolean>(false)

	const connect = useCallback(() => {
		if (socketRef.current) return
		const socket = io(socketUrl)
		socket.on('connect', () => setIsConnected(true))
		joinRoom(socket, 'Room#1')
		socketRef.current = socket
	}, [socketUrl])

	const disconnect = useCallback(() => {
		socketRef.current?.disconnect()
		socketRef.current?.on('disconnect', () => setIsConnected(false))
		socketRef.current = null
	}, [])

	return { connect, disconnect, socket: socketRef.current, isConnected }
}

export const sendMessage = (socket: Socket, payload: IMessage) => {
	return new Promise<TSocketResponse>((resolve, reject) => {
		socket.emit('send-message', payload, (response: TSocketResponse) => {
			if (response) resolve(response)
			else reject(new Error('No response from server'))
		})
	})
}

export const joinRoom = (socket: Socket, room: string) => {
	return new Promise<TSocketResponse>((resolve, reject) => {
		socket.emit('join-room', room, (response: TSocketResponse) => {
			if (!room) return new Error('Room not found')

			if (response.status === 'error') reject(response)
			else resolve(response)
		})
	})
}
