'use client'

import { ConnectChatProvider } from '@/hooks/context/chat/useConnectChat'
import { TReactNode } from '@/types/externalTypes/NextTypes'



export default function ChatProvider({ children }: TReactNode) {
	return <ConnectChatProvider>{children}</ConnectChatProvider>
}
