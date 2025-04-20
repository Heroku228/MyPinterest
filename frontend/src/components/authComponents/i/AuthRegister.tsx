import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { formInputStyles } from '@/constants/styles/formInputStyles'
import { Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AuthDiv } from '../AuthDiv'
import { PasswordBlock } from './block/PasswordBlock'

export const AuthRegister = () => {
	const loginRef = useRef<HTMLInputElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [selectedFileName, setSelectedFilename] = useState<string>()

	const handleShowFS = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		const fileName = file?.name

		const extensition = fileName?.split('.').pop()?.toLowerCase()
		console.log('EXT: ', extensition)
		if (file) {
			const newFileName = file.name.slice(0, 20) + `.${extensition}`
			setSelectedFilename(newFileName)
		}
	}

	useEffect(() => {
		if (selectedFileName && selectedFileName?.length >= 30) {
			setSelectedFilename(selectedFileName.slice(0, 30))
		}
	}, [selectedFileName])

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

			<PasswordBlock />

			<div
				onClick={handleShowFS}
				className={`relative ${formInputStyles} flex items-center gap-4 input-bold-border input-bold-border-focus rounded-md input-bg border border-transparent cursor-pointer hover:bg-purple-900 hover:border-purple-800 transition-bg duration-300`}
			>
				<label className='cursor-pointer ' htmlFor='icon'>
					Select icon
				</label>
				<input
					ref={fileInputRef}
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

			<Button additionalStyles='mb-6 mt-6' variant={STYLES_VARIANTS.SECONDARY}>
				Register
			</Button>
		</>
	)
}
