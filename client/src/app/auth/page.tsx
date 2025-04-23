'use client'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthForm } from './AuthForm'

export default function AuthPage() {
	const router = useRouter()

	const { isAuthenticated, user } = useAuth()

	useEffect(() => {
		if (isAuthenticated && user) router.push(ROUTES.PROFILE(user?.username))
		else router.push(ROUTES.REGISTER)
	}, [isAuthenticated])

	return <AuthForm />
}
