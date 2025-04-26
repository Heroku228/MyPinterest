import { INextRequest } from '@/types/externalTypes/NextTypes'
import { NextResponse } from 'next/server'

export function middleware(request: INextRequest) {
	console.log('middleware')
	console.log(request)

	return NextResponse.next()
}

export const config = {
	matcher: ['/']
}

