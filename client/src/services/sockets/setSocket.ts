import { useCallback, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { joinRoom } from './joinRoom'

export const setSocket = (socketUrl: string) => {
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

