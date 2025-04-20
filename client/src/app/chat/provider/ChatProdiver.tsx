import { ConnectChatProvider } from '@/hooks/context/chat/useConnectChat'
import { TReactNode } from '@/types/ReactNode'

export default function ChatProvider({ children }: TReactNode) {
	return <ConnectChatProvider>{children}</ConnectChatProvider>
}
