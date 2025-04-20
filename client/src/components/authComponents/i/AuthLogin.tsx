import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { Lock, Mail } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../../ui/Button'
import { AuthDiv } from '../AuthDiv'
import { ShowPasswordIcon } from '../ShowPasswordIcon'

export const AuthLogin = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const loginRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

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

			<Button additionalStyles='mb-6' variant={STYLES_VARIANTS.SECONDARY}>
				Sign in
			</Button>
		</>
	)
}
