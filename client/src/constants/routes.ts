export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth',
	REGISTER: '/auth',
	PROFILE: (username: string) => `/profile/${username}`,
	PROFILE_WITHOUT_USERNAME: '/profile',
	SETTINGS: '/profile/settings',
	CHAT: '/chat',
	CREATE_PIN: '/pin',
	API: '/api',
}


export const UPLOADS = {
	AVATARS: 'http://localhost:3000/api/v1/uploads/avatars/'
}

