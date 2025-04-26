'use client'
import { ROUTES } from '@/constants/routes'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export const RedirectInterLayer = ({
	children,
	redirect,
}: {
	children: ReactNode
	redirect: string
}) => {
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		console.log('fasdfasdf')
		if (pathname !== redirect) {
			console.log('true')
			router.push(ROUTES.HOME)
		} else {
			console.log('false')
		}
	}, [pathname, redirect])

	return <>{children}</>
}
