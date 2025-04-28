'use client'

import { CreatePin } from '@/components/pins/CreatePin'
import { Loader } from '@/components/ui/Loader'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useWindowSize } from '@/hooks/useWindowSize'
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
	const { width } = useWindowSize()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated) router.push(ROUTES.LOGIN)
		}
	}, [isAuthenticated, isLoading])

	if (isLoading) return <Loader />

	return (
		<div
			className={`text-white mt-20 flex 
			${width > 1300 ? 'w-5/6 gap-10 ' : 'gap-4'}
			${width < 900 ? 'flex-col' : ''}`}
		>
			<RenderCreatePin />
			<CreatePin />
		</div>
	)
}
