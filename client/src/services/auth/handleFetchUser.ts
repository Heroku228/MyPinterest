import { HTTP_STATUS } from '@/types/Response'
import axios from 'axios'


export const getCurrentAuthenticatedUser = async (
) => {
	try {
		return await axios.get('http://localhost:3000/api/v1/auth/me', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
	} catch (err) {
		console.error('[GetCurrentAuthenticatedUser ERROR]: ', err)
		return {
			userData: 'No data',
			status: HTTP_STATUS.BAD_REQUEST,
			statusText: 'No data'
		}
	}


}

export const getUserByUsername = async (username: string) => {
	const res = await axios.get(`http://localhost:3000/api/v1/users/${username}`)
		.catch(err => console.error('[GetUserByUsername ERROR]: ', err))

	console.log("GET USER: RESPONSE: ", res)
}
