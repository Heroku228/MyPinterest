export const STYLES_VARIANTS = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary'
} as const

export type STYLES_VARIANTS = (typeof STYLES_VARIANTS)[keyof typeof STYLES_VARIANTS]
