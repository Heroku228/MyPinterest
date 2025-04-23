import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/AuthTypes/AuthTypes'
import { Lock, Mail } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../../../ui/Button'
import { AuthDiv } from '../../../ui/FormInputBlock'
import { ShowPasswordIcon } from '../passwordBlock/ShowPasswordIcon'

export const AuthLogin = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const loginRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const { login } = useAuth()

	const handleLogin = async () => {
		const emailOrUsername = loginRef.current?.value.trim()
		const password = passwordRef.current?.value.trim()

		if (!emailOrUsername || !password) throw new Error('No login or password')

		const credentials: UserTypes.TLoginDto = {
			emailOrUsername: emailOrUsername,
			password: password,
		}

		await login(credentials)
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
				}}
				children={
					<ShowPasswordIcon
						setShowPassword={setShowPassword}
						showPassword={showPassword}
					/>
				}
			/>

			<Button
				additionalStyles='mb-6'
				onClick={handleLogin}
				variant={STYLES_VARIANTS.SECONDARY}
			>
				Sign in
			</Button>
		</>
	)
}
