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
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		console.log('IS AUTH: ', isAuthenticated)
		if (!isLoading) {
			if (!isAuthenticated) router.push(ROUTES.LOGIN)
		}
	}, [isAuthenticated, isLoading])

	if (isLoading) return <Loader />

	return (
		<div className='text-white'>
			<RenderCreatePin />
			<CreatePin />
		</div>
	)
}
