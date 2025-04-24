'use client'

import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Account } from './Account'

export const ClientAccountData = () => {
	const { isLoading, user } = useAuth()
	const { paramsUsername } = useParamsContext()
	const [isOwner, setIsOwner] = useState<boolean | null>(false)

	const getUserAccount = async (
		username: string
	): Promise<UserTypes.TFetchUserResponse> => {
		const response = await axios.get(
			`http://localhost:3000/api/v1/users/${username}`
		)

		console.log('GET USER ACCOUNT: ', response.data)
		return response.data
	}

	useEffect(() => {
		const handleProps = async () => {
			setIsOwner(paramsUsername === user?.username)
			console.log('username: ', paramsUsername)

			if (!isOwner) {
				await getUserAccount(paramsUsername)
			}
		}
		handleProps()
	}, [user])

	if (!isOwner) return <Account />

	return <div>{isLoading ? <Loader2Icon /> : <Account />}</div>
}
