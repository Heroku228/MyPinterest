import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthLogin } from './authentication/AuthLogin'
import { AuthRegister } from './register/AuthRegister'

export const AuthContent = ({
	registerForm = false,
}: {
	registerForm: boolean
}) => {
	const router = useRouter()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) router.replace(ROUTES.PROFILE_WITHOUT_USERNAME)
	}, [isAuthenticated])

	return (
		<div className='flex flex-col gap-2 relative'>
			{registerForm ? <AuthRegister /> : <AuthLogin />}
		</div>
	)
}
