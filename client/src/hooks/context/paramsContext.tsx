'use client'
import { INextParams } from '@/types/externalTypes/NextTypes'
import React, { createContext, useContext } from 'react'

type ParamsContextType = {
	params: INextParams
	paramsUsername: string
}

export const ParamsContext = createContext<ParamsContextType | null>(null)

export const ParamsProvider = ({
	params,
	children,
}: {
	params: INextParams
	children: React.ReactNode
}) => {
	const paramsData = JSON.parse(params.value)
	const paramsUsername = paramsData ? paramsData.username : ''

	return (
		<ParamsContext.Provider value={{ params, paramsUsername }}>
			{children}
		</ParamsContext.Provider>
	)
}

export const useParamsContext = () => {
	const context = useContext(ParamsContext)
	if (!context)
		throw new Error('useParamsContext must be used within ParamsProvider')
	return context
}
