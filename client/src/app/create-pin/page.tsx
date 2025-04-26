'use client'

import { Header } from '@/components/header/Header'
import { CreatePin } from '@/components/pins/CreatePinModal'
import { RenderCreatePin } from '@/components/pins/RenderCreatePin'
import { ROUTES } from '@/constants/routes'
import { UsePinProvider } from '@/hooks/context/usePin'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PinsContainer() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) router.push(ROUTES.LOGIN)
	}, [isAuthenticated])

	return (
		<div className='text-white'>
			<UsePinProvider>
				<Header />
				<RenderCreatePin />
				<CreatePin />
			</UsePinProvider>
		</div>
	)
}
