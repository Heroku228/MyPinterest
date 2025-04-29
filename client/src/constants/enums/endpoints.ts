import { PINS_ROUTE } from '../routes'

export const PINS_ENDPOINTS = {
	GET_ALL_PINS: `${PINS_ROUTE}/all`,
	CREATE_PIN: `${PINS_ROUTE}/save-pin`,
	GET_PIN_BY_TITLE: (title: string) => `${PINS_ROUTE}/${title}`,
	GET_PIN_FIELD: (field: string) => `${PINS_ROUTE}/field/${field}`,
} as const

export type PINS_ENDPOINTS = (typeof PINS_ENDPOINTS)[keyof typeof PINS_ENDPOINTS]
