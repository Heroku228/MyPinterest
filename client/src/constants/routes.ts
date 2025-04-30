export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth',
	REGISTER: '/auth',
	PROFILE: (username: string) => `/profile/${username}`,
	PROFILE_WITHOUT_USERNAME: '/profile',
	SETTINGS: '/profile/settings',
	CHAT: '/chat',
	CREATE_PIN: '/create-pin',
	API: '/api',
	USERS: '/users'
}

export const PINS_ROUTER = {
	GET_USER_PINS: '/pins/get-user-pins'
}
export const PIN_API_URL = 'http://localhost:3000/api/v1/pins'

export const UPLOADS = {
	AVATARS: 'http://localhost:3000/api/v1/uploads/avatars/'
}

