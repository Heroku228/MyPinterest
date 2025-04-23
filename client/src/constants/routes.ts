export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth',
	REGISTER: '/auth',
	PROFILE: (username: string) => `/profile/${username}`,
	SETTINGS: '/profile/settings',
	CHAT: '/chat',
	API: '/api',
}


export const UPLOADS = {
	AVATARS: 'http://127.0.0.1:3000/api/v1/uploads/avatars/'
}

