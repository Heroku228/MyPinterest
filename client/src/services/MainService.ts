export const convertFileToBase64 = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = reject
	})
}

export const sanitizedFileName = (filename: string) => {
	const isValid = /^[a-zA-Z0-9.]+$/.test(filename)

	if (isValid) return filename

	const randomName = Math.random().toString(36).substring(2, 12)

	const extensionMatch = filename.match(/\.[a-zA-Z0-9]+$/)
	const extension = extensionMatch ? extensionMatch[0] : ''

	return `${randomName}${extension}`
}

export const scrollToBottom = () => {
	window.scroll({
		top: document.body.scrollHeight + 100,
		behavior: 'smooth'
	})
}

export const validPassword = (password: string | undefined): boolean => {
	if (!password) return false

	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
	return passwordRegex.test(password)
}


type TValidateLink = {
	valid: boolean,
	error?: string
}
export const validateLink = (link: string): TValidateLink => {
	const MAX_LENGTH = 1024

	if (link.length > MAX_LENGTH)
		return {
			valid: false,
			error: `Link is too long.`
		}


	try {
		const url = new URL(link)

		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			return {
				valid: false,
				error: 'Only HTTP and HTTPS links are allowed'
			}
		}

		return { valid: true }
	} catch (err) {
		return {
			valid: false,
			error: 'Invalid URL format.'
		}
	}
}
