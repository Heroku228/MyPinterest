import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Account = () => {
	const { user, logout, isAuthenticated } = useAuth()

	const router = useRouter()
	useEffect(() => {
		console.log('USER : ', user)
		if (!isAuthenticated) router.push('/auth')
	}, [isAuthenticated])

	return (
		<div>
			<h1>{user?.username}</h1>
			<h2>{user?.email}</h2>
			<img
				src={`http://localhost:3000/api/v1/uploads/avatars${user?.userIconUrl}`}
				alt='user icon'
			/>
			<button onClick={logout}>Logout</button>
		</div>
	)
}
