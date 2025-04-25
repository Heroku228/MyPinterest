'use client'

import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import axios from '@/services/axiosInstance'
import { UserTypes } from '@/types/UserTypes'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Account } from './Account'

export const ClientAccountData = () => {
	const { isLoading, user } = useAuth()
	const { socket } = useConnectServer()
	const { paramsUsername } = useParamsContext()
	const [isOwner, setIsOwner] = useState<boolean | null>(false)

	const getUserAccount = async (
		username: string
	): Promise<UserTypes.TFetchUserResponse> => {
		const response = await axios.get(`/users/${username}`)
		return response.data
	}

	useEffect(() => {
		setTimeout(() => {
			socket?.emit('ping')
		}, 3000)
	}, [])

	useEffect(() => {
		const handleProps = async () => {
			setIsOwner(paramsUsername === user?.username)

			if (!isOwner) {
				await getUserAccount(paramsUsername)
			}
		}
		handleProps()
	}, [user])

	if (!isOwner) return <Account />

	return <div>{isLoading ? <Loader2Icon /> : <Account />}</div>
}
