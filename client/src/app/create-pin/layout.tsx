'use client'
import { Header } from '@/components/header/Header'
import { UsePinProvider } from '@/hooks/context/usePin'
import { ReactNode } from 'react'

export default function CreatePinLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<UsePinProvider>{children}</UsePinProvider>
		</>
	)
}
