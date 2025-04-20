import type { Metadata } from 'next'
import ChatProvider from './provider/ChatProdiver'

export const metadata: Metadata = {
	title: 'Chat with Tailwind Magic',
	description: 'Сокеты, стиль и немного волшебства',
}

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main
			className='min-h-screen'
			style={{ backgroundColor: `rgba(0,0,0,0.9)` }}
		>
			<ChatProvider>{children}</ChatProvider>
		</main>
	)
}
