import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Account = () => {
	const { user, logout, isAuthenticated } = useAuth()

	const router = useRouter()
	useEffect(() => {
		if (!isAuthenticated) router.push('/auth')
	}, [isAuthenticated])

	return (
		<div>
			<h1>{user?.username}</h1>
			<h2>{user?.email}</h2>
			<button onClick={logout}>Logout</button>
		</div>
	)
}
