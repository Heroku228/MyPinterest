import { NextResponse } from 'next/server'
import { setSocket } from './services/socketService/socketService'
import { INextRequest } from './types/externalTypes/NextTypes'

export function middleware(request: INextRequest) {
	// TODO
	// max.accounts from one ip = 5
	// max.requests from account ~ 20
	// Log users activities

	const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'IP not found'
	const userAgent = request.headers.get('user-agent') || 'unknown'
	return NextResponse.next()
}

export const config = {
	matcher: ['/pins/:path*']
}

