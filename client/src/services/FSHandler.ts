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
