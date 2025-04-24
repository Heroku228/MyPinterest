'use client'

import { MessageWrapper } from '@/components/chatComponents/messages/MessageWrapper'
import { ChatSidebar } from '@/components/chatComponents/sidebar/ChatSidebar'
import { AuthNavbar } from '@/components/profile/AuthNavbar'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'

export default function ChatContent() {
	const { socket, room } = useConnectServer()
	if (!socket)
		return <h1>Failed to establish your connection to the server.</h1>

	return (
		<div className='grid grid-cols-6 gap-35 mx-auto min-h-screen overflow-hidden'>
			<div className='span-col-1'>
				<ChatSidebar />
			</div>

			<MessageWrapper socket={socket} room={room} />

			<AuthNavbar />
		</div>
	)
}
