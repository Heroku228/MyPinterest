import { SOCKET_NOT_FOUND } from '@/constants/response/Response'
import { joinRoom, setSocket } from '@/services/socketService/socketService'
import { ContextTypes } from '@/types/ContextTypes/ContextTypes'
import { TReactNode } from '@/types/externalTypes/NextTypes'
import { TSocketResponse } from '@/types/SocketsTypes/TSocketResponse'
import { createContext, useContext, useEffect, useState } from 'react'

const ConnectServerContext = createContext<
	ContextTypes.TConnectServerProvider | undefined
>(undefined)

export const UseConnectServerProvider = ({ children }: TReactNode) => {
	const socketUrl = process.env.NEXT_PUBLIC_SERVER_SOCKET_URL

	if (!socketUrl)
		throw new Error('[ConnectChatProvider] socket url is undefined')

	const { connect, disconnect, socket, isConnected } = setSocket(socketUrl)
	const [room, setRoom] = useState<string>('Room#1')

	useEffect(() => {
		connect()
		return () => disconnect()
	}, [])

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
		<ConnectServerContext.Provider
			value={{
				socket,
				isConnected,
				room,
				handleRoom,
			}}
		>
			{children}
		</ConnectServerContext.Provider>
	)
}

export const useConnectServer = () => {
	const context = useContext(ConnectServerContext)

	if (!context)
		throw new Error(
			'useConnectServer must be used within an ConnectServerProvider'
		)

	return context
}
