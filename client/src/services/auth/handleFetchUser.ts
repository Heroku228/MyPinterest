import axios from '@/services/axiosInstance'
import { HTTP_STATUS } from '@/types/Response'
import { UserTypes } from '@/types/UserTypes'



export const getCurrentAuthenticatedUser = async (
): Promise<UserTypes.TFetchUserResponse> => {
	try {
		const response = await axios.get('/auth/me')
		console.log('RESPONSE FROM GET CURRENT AUTH USER: ', response)
		return {
			data: response.data,
			headers: response.headers,
			statusText: response.statusText,
			access: true,
			status: HTTP_STATUS.OK,
		}
	} catch (err) {
		console.error('[GetCurrentAuthenticatedUser ERROR]: ', err)
		return {
			data: { userData: null },
			headers: {},
			status: HTTP_STATUS.BAD_REQUEST,
			statusText: 'No data',
			access: false,
			error: err
		}
	}
}

export const getUserByUsername = async (username: string) => {
	console.log('GET USER BY USERNAME: ', username)
	return await axios.get(`/users/${username}`,)
		.catch(err => console.error('[GetUserByUsername ERROR]: ', err))
}
