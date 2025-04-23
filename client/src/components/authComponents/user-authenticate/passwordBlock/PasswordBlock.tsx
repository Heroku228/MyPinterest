import { Lock, LockKeyhole } from 'lucide-react'
import { RefObject, SetStateAction, useState } from 'react'
import { AuthDiv } from '../../../ui/FormInputBlock'
import { ShowPasswordIcon } from './ShowPasswordIcon'
import { validPassword } from '@/services/MainService'

export const PasswordBlock = ({
	passwordRef,
	confirmPasswordRef,
	error,
	setError,
}: {
	passwordRef: RefObject<HTMLInputElement | null>
	confirmPasswordRef: RefObject<HTMLInputElement | null>
	error: boolean
	setError: React.Dispatch<SetStateAction<boolean>>
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [errorText, setErrorText] = useState<string | null>(null)

	const handleChange = () => {
		const password = passwordRef.current?.value.trim()
		const confirmPassword = confirmPasswordRef.current?.value.trim()
		console.log('PASSWORDS: ', password, confirmPassword)

		if (!password || !confirmPassword) {
			setError(false)
			setErrorText(null)
			return
		}

		if (password !== confirmPassword) {
			setErrorText('Passwords do not match')
			setError(true)
			return
		}

		if (!validPassword(password)) {
			setErrorText(
				'Password must be at least 8 characters long, must contain at least 1 capital letter, must include a special character'
			)
			setError(true)
		} else {
			setError(false)
			setErrorText(null)
		}
	}

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
					onChange: () => handleChange(),
				}}
				children={
					<ShowPasswordIcon
						setShowPassword={setShowPassword}
						showPassword={showPassword}
					/>
				}
			/>
			<AuthDiv
				Image={LockKeyhole}
				inputProps={{
					ref: confirmPasswordRef,
					type: `${showPassword ? 'text' : 'password'}`,
					name: 'confirmPassword',
					placeholder: 'Confirm password',
					id: 'confirmPassword',
					onChange: () => handleChange(),
				}}
			/>

			{error ? (
				<span className='absolute left-85 w-45 text-xs text-red-400 italic ml-1 font-bold'>
					{errorText}
				</span>
			) : null}
		</div>
	)
}
