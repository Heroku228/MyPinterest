import { AxiosResponse } from 'axios'




export const sendErrorMessage = (res: AxiosResponse<any, any>) => {
	return {
		access: false,
		status: res.status,
		message: res.data.message,
		statusText: res.statusText
	}
}
