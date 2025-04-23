import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import {
	formIconStyles,
	formInputStyles,
} from '@/constants/styles/formInputStyles'
import { useAuth } from '@/hooks/context/user/useAuth'
import { convertFileToBase64, sanitizedFileName } from '@/services/FSHandler'
import { UserTypes } from '@/types/AuthTypes/AuthTypes'
import { FileImage, Mail, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AuthDiv } from '../AuthDiv'
import { PasswordBlock } from './block/PasswordBlock'

export const AuthRegister = () => {
	const usernameRef = useRef<HTMLInputElement>(null)
	const userIconRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const confirmPasswordRef = useRef<HTMLInputElement>(null)

	const [error, setError] = useState<boolean>(true)
	const [selectedFileName, setSelectedFilename] = useState<string>()

	const { register } = useAuth()

	const handleRegister = async () => {
		if (error) throw new Error('Passwords do not match')

		const username = usernameRef.current?.value.trim()
		const email = emailRef.current?.value.trim()
		const password = passwordRef.current?.value.trim()
		const file = userIconRef.current?.files?.[0]

		if (!username || !email || !password || !file) return

		const base64 = await convertFileToBase64(file)

		const data: UserTypes.TRegisterDto = {
			username,
			email,
			password,
			fileName: sanitizedFileName(file.name),
			userIconBase64: base64,
		}

		try {
			await register(data)
		} catch (err) {
			console.error('Ошибка при регистрации: ', err)
		}
	}

	const handleShowFS = () => {
		userIconRef.current?.click()
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		const fileName = file?.name

		if (!file) return

		const extensition = fileName?.split('.').pop()?.toLowerCase()
		console.log('EXT: ', extensition)
		const newFileName = file.name.slice(0, 20) + `.${extensition}`
		setSelectedFilename(newFileName)
	}

	useEffect(() => {
		if (selectedFileName && selectedFileName?.length >= 30) {
			setSelectedFilename(selectedFileName.slice(0, 30))
		}
	}, [selectedFileName])

	return (
		<>
			<AuthDiv
				Image={User}
				inputProps={{
					ref: usernameRef,
					type: 'text',
					name: 'login',
					id: 'login',
					placeholder: 'Username',
				}}
			/>
			<AuthDiv
				Image={Mail}
				inputProps={{
					ref: emailRef,
					type: 'text',
					name: 'login',
					id: 'login',
					placeholder: 'Email',
				}}
			/>

			<PasswordBlock
				passwordRef={passwordRef}
				confirmPasswordRef={confirmPasswordRef}
				error={error}
				setError={setError}
			/>

			<div
				onClick={handleShowFS}
				className={`relative ${formInputStyles} flex items-center gap-4 input-bold-border input-bold-border-focus rounded-md input-bg border border-transparent cursor-pointer hover:bg-purple-900 hover:border-purple-800 transition-bg duration-300`}
			>
				<label
					className='cursor-pointer flex gap-4 text-gray-400'
					htmlFor='icon'
				>
					<FileImage className={formIconStyles} /> Avatar
				</label>
				<input
					ref={userIconRef}
					type='file'
					name='icon'
					id='icon'
					onChange={handleFileChange}
					className='hidden'
				/>
				<span className='absolute -bottom-7 left-1 opacity-80'>
					{selectedFileName}
				</span>
			</div>

			<Button
				additionalStyles='mb-6 mt-6'
				onClick={handleRegister}
				variant={STYLES_VARIANTS.SECONDARY}
			>
				Register
			</Button>
		</>
	)
}
