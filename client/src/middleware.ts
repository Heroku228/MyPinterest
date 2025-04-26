import { NextResponse } from 'next/server'
import { ROUTES } from './constants/routes'
import { INextRequest } from './types/externalTypes/NextTypes'

export function middleware(request: INextRequest) {

	const { pathname } = request.nextUrl

	if (pathname === ROUTES.PROFILE_WITHOUT_USERNAME) {
		const token = request.cookies.get('access_token')?.value

		if (!token) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))

		try {
			const payload = JSON.parse(atob(token.split('.')[1]))
			console.log('payload: ', payload)

			const username = payload.username

			if (username)
				return NextResponse.redirect(new URL(ROUTES.PROFILE_WITHOUT_USERNAME, request.url))

		}
		catch (err) {
			return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
		}

		return NextResponse.next()
	}


	return NextResponse.next()
}

// export const config = {
// 	matcher: ['/pins/:path*']
// }

