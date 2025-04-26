'use client'

import { UserNotFound } from '@/components/Errors/UserNotFound'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import axios from '@/services/axiosInstance'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Account } from './Account'

export const ClientAccountData = () => {
	const { socket } = useConnectServer()
	const { paramsUsername } = useParamsContext()
	const [isUserExist, setIsUserExist] = useState<boolean>(false)


	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(`/users/${paramsUsername}`)
			if (response.status !== 200) setIsUserExist(false)
			else setIsUserExist(true)
		}

		fetchUser()

		if (isUserExist) {
			setTimeout(() => {
				socket?.emit('ping')
			}, 3000)
		}
	}, [])

	return <>{isUserExist ? <Account /> : <UserNotFound />}</>
}
