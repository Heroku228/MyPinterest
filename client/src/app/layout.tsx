import { Header } from '@/components/header/Header'
import type { Metadata } from 'next'
import './globals.css'
import { GlobalProvider } from './Provider'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className='w-11/12 m-auto p-2 overflow-x-hidden'
				style={{ backgroundColor: `rgba(0,0,0,0.9)` }}
			>
				<GlobalProvider>
					<>
						<Header />
						{children}
					</>
				</GlobalProvider>
			</body>
		</html>
	)
}
