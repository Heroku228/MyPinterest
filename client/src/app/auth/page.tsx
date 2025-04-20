'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { AuthForm } from './AuthForm'

export default function AuthPage() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const type = searchParams.get('type') ?? 'login'

	useEffect(() => {
		if (type !== 'login' && type !== 'register')
			router.replace('/auth?type=login')
	}, [type, router])

	return (
		<div>
			<AuthForm />
		</div>
	)
}
