import { PINS_ENDPOINTS } from '@/constants/enums/endpoints'
import axios from '@/services/axiosInstance'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { AxiosResponse } from 'axios'

export const savePin = (pin: PinTypes.IPin) => {
	const response: Promise<void | AxiosResponse<any, any>> = axios.post(PINS_ENDPOINTS.CREATE_PIN, {
		pin
	}).catch(err => console.error('SAVE PIN: (PIN)', pin, 'SAVE PIN: (RESPONSE): ', response, err
	))
	console.log('PIN SERVICE RESPONSE: ', response)
}

