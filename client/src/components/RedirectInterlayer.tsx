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
		if (pathname !== redirect) router.push(ROUTES.HOME)
	}, [pathname, redirect])

	return <>{children}</>
}
