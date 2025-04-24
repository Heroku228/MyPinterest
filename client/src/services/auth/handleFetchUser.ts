import { HTTP_STATUS } from '@/types/Response'
import { UserTypes } from '@/types/UserTypes'
import axios from 'axios'


export const getCurrentAuthenticatedUser = async (
): Promise<UserTypes.TFetchUserResponse> => {
	try {
		const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return {
			data: response.data.userData,
			headers: response.headers,
			statusText: response.statusText,
			access: true,
			status: HTTP_STATUS.OK,
		}
	} catch (err) {
		console.error('[GetCurrentAuthenticatedUser ERROR]: ', err)
		return {
			data: null,
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
	return await axios.get(`http://localhost:3000/api/v1/users/${username}`)
		.catch(err => console.error('[GetUserByUsername ERROR]: ', err))
}
