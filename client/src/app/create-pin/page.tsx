'use client'

import { CreatePin } from '@/components/pins/CreatePinModal'
import { Loader } from '@/components/ui/Loader'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RenderCreatePin = dynamic(
	() =>
		import('@/components/pins/RenderCreatePin').then(
			mod => mod.RenderCreatePin
		),
	{
		loading: () => <Loader />,
	}
)

export default function PinsContainer() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) router.push(ROUTES.LOGIN)
	}, [isAuthenticated])

	return (
		<div className='text-white'>
			<RenderCreatePin />
			<CreatePin />
			<h1>dasfglkajsdfkkjldas</h1>
		</div>
	)
}
