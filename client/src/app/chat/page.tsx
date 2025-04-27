'use client'

import { MessageWrapper } from '@/components/chatComponents/messages/MessageWrapper'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'

export default function ChatContent() {
	const { socket, room } = useConnectServer()
	if (!socket)
		return <h1>Failed to establish your connection to the server.</h1>

	return <MessageWrapper socket={socket} room={room} />
}
