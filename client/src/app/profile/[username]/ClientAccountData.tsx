'use client'

import { useAuth } from '@/hooks/context/user/useAuth'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Account } from './Account'

export const ClientAccountData = ({ params }: { params: any }) => {
	const { isLoading, user } = useAuth()
	const [isOwner, setIsOwner] = useState<boolean | null>(false)

	const getUserAccount = async (username: string) => {
		const response = await axios.get(
			`http://localhost:3000/api/v1/users/${username}`
		)
		console.log('GET USER ACCOUNT: ', response)
		return response.data
	}

	useEffect(() => {
		console.log('PARAMS: ', params.value)

		const handleProps = async () => {
			const usernameObject = params.value as string
			const usernameFromProps = JSON.parse(usernameObject)
			console.log('props: ', usernameFromProps.username)
			console.log('user:', user?.username)
			setIsOwner(usernameFromProps.username === user?.username)

			if (!isOwner) {
				await getUserAccount(usernameFromProps.username)
			}
		}
		handleProps()
	}, [user])

	if (!isOwner) return <h1>TEST</h1>

	return <div>{isLoading ? <Loader2Icon /> : <Account />}</div>
}
