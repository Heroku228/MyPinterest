import { SOCKET_NOT_FOUND } from '@/constants/response/Response'
import { joinRoom, setSocket } from '@/services/socketService/socketService'
import { ContextTypes } from '@/types/ContextTypes/ContextTypes'
import { TReactNode } from '@/types/externalTypes/NextTypes'
import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'
import { createContext, useContext, useEffect, useState } from 'react'

const ConnectChatContext = createContext<
	ContextTypes.TConnectChatProvider | undefined
>(undefined)

export const ConnectChatProvider = ({ children }: TReactNode) => {
	const socketUrl = process.env.NEXT_PUBLIC_SERVER_SOCKET_URL

	if (!socketUrl)
		throw new Error('[ConnectChatProvider] socket url is undefined')

	const { connect, disconnect, socket, isConnected } = setSocket(socketUrl)
	const [room, setRoom] = useState<string>('Room#1')

	useEffect(() => {
		handleJoin()
		return () => handleExit()
	}, [])

	const handleJoin = () => connect()
	const handleExit = () => disconnect()

	const handleRoom = async (
		roomName: string
	): Promise<TSocketResponse | unknown> => {
		setRoom(roomName)

		if (!socket) return SOCKET_NOT_FOUND

		try {
			return await joinRoom(socket, roomName)
		} catch (err) {
			return err
		}
	}

	return (
		<ConnectChatContext.Provider
			value={{
				socket,
				isConnected,
				room,
				handleRoom,
			}}
		>
			{children}
		</ConnectChatContext.Provider>
	)
}

export const useConnectChat = () => {
	const context = useContext(ConnectChatContext)

	if (!context)
		throw new Error('useConnectChat must be used within an ConnectChatProvider')

	return context
}
