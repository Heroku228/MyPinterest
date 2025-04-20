import { Lock } from 'lucide-react'
import { useRef, useState } from 'react'
import { AuthDiv } from '../../AuthDiv'
import { ShowPasswordIcon } from '../../ShowPasswordIcon'

export const PasswordBlock = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const passwordRef = useRef<HTMLInputElement>(null)

	return (
		<div className='flex flex-col gap-2'>
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
			<AuthDiv
				Image={Lock}
				inputProps={{
					ref: passwordRef,
					type: `${showPassword ? 'text' : 'password'}`,
					name: 'confirmPassword',
					placeholder: 'Confirm password',
					id: 'confirmPassword',
				}}
			/>
		</div>
	)
}
