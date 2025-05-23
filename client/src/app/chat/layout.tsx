import { UseChatDataProvider } from '@/hooks/context/chat/useChatData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Chat with Tailwind Magic',
	description: '',
}

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className='min-h-screen overflow-x-hidden'>
			<UseChatDataProvider>{children}</UseChatDataProvider>
		</main>
	)
}
