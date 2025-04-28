'use client'
import { PinProvider } from '@/hooks/context/usePin'
import { ReactNode } from 'react'

export default function CreatePinLayout({ children }: { children: ReactNode }) {
	return (
		<main>
			<PinProvider>{children}</PinProvider>
		</main>
	)
}
