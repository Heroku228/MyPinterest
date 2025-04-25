import { AuthTypes, } from '@/types/AuthTypes/AuthTypes'
import { convertFileToBase64, sanitizedFileName } from '../MainService'
import { UserTypes } from '@/types/UserTypes'

export const handleRegister = async ({
	userIconRef,
	usernameRef,
	emailRef,
	passwordRef,
	register,
	error }: AuthTypes.TRegisterParams) => {
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
