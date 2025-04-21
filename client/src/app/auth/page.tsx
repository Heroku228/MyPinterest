'use client'

import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthForm } from './AuthForm'

export default function AuthPage() {
	const router = useRouter()

	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/auth/i')
		} else {
			router.push('/auth')
		}
	}, [isAuthenticated])

	return (
		<div>
			<AuthForm />
		</div>
	)
}
