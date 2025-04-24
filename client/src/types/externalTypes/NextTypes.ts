import { NextRequest } from 'next/server'
import { ReactNode, SetStateAction } from 'react'

export interface INextRequest extends NextRequest {
	ip: string
}

export type TReactNode = {
	children: ReactNode
}

export type TShowHint = {
	showHint: boolean,
	setShowHint: React.Dispatch<SetStateAction<boolean>>
}

export interface INextParams {
	status: string,
	value: string,
	reason: any,
	debugInfo: any,
	response: Object
}
