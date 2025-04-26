'use client'

import { UserNotFound } from '@/components/Errors/UserNotFound'
import { Loader } from '@/components/ui/Loader'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { useParamsContext } from '@/hooks/context/paramsContext'
import axios from '@/services/axiosInstance'
import { useEffect, useState } from 'react'
import { Account } from './Account'

export const ClientAccountData = () => {
	const { socket } = useConnectServer()
	const { paramsUsername } = useParamsContext()
	const [isUserExist, setIsUserExist] = useState<boolean | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`/users/${paramsUsername}`)
				setIsUserExist(response.status === 200)
			} catch (err) {
				setIsUserExist(false)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [paramsUsername])

	useEffect(() => {
		if (isUserExist) {
			const timer = setTimeout(() => {
				socket?.emit('ping')
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [])

	if (isLoading) return <Loader />

	return <>{isUserExist ? <Account /> : <UserNotFound />}</>
}
