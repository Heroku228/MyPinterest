import { PIN_API_URL } from '../routes'

export const PINS_ENDPOINTS = {
	GET_ALL_PINS: `${PIN_API_URL}/all`,
	CREATE_PIN: `${PIN_API_URL}/save-pin`,
	GET_PIN_BY_TITLE: (title: string) => `${PIN_API_URL}/${title}`,
	GET_PIN_FIELD: (field: string) => `${PIN_API_URL}/field/${field}`,
} as const

export type PINS_ENDPOINTS = (typeof PINS_ENDPOINTS)[keyof typeof PINS_ENDPOINTS]
