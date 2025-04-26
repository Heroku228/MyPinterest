import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../../../ui/Button'
import { AuthDiv } from '../../../ui/FormInputBlock'
import { ShowPasswordIcon } from '../passwordBlock/ShowPasswordIcon'

export const AuthLogin = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const loginRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [errorMessage, setErroreMessage] = useState<string | null>(null)

	const { login, user, isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (isAuthenticated) router.push(ROUTES.PROFILE_WITHOUT_USERNAME)
	}, [isAuthenticated])

	const handleLogin = async () => {
		const emailOrUsername = loginRef.current?.value.trim()
		const password = passwordRef.current?.value.trim()

		if (!emailOrUsername || !password) {
			setErroreMessage('Please fill in all fields')
			return
		}

		const credentials: UserTypes.TLoginDto = {
			emailOrUsername: emailOrUsername,
			password: password,
		}

		await login(credentials).catch(err => {
			console.log('AUTH LOGIN RESPONSE ERROR: ', err)
			setErroreMessage('Invalid credentials')
		})
	}

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') await handleLogin()
	}

	return (
		<>
			<AuthDiv
				Image={Mail}
				inputProps={{
					ref: loginRef,
					type: 'text',
					name: 'login',
					id: 'login',
					placeholder: 'Username or email',
				}}
			/>

			<AuthDiv
				Image={Lock}
				inputProps={{
					ref: passwordRef,
					type: `${showPassword ? 'text' : 'password'}`,
					name: 'password',
					placeholder: 'Password',
					id: 'password',
					onKeyDown: handleKeyDown,
				}}
				children={
					<ShowPasswordIcon
						setShowPassword={setShowPassword}
						showPassword={showPassword}
					/>
				}
			/>

			<Button
				additionalStyles='mb-8'
				onClick={handleLogin}
				variant={STYLES_VARIANTS.SECONDARY}
			>
				Sign in
			</Button>
			<span className='absolute -bottom-10 left-1 italic text-xl text-red-400'>
				{errorMessage}
			</span>
		</>
	)
}
