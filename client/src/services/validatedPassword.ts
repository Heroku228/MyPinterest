export const validPassword = (password: string | undefined): boolean => {
	if (!password) return false

	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
	return passwordRegex.test(password)
}
