'use client'
import {
	getCurrentAuthenticatedUser,
	getUserByUsername,
} from '@/services/auth/handleFetchUser'
import axios from '@/services/axiosInstance'
import { AuthTypes } from '@/types/AuthTypes/AuthTypes'
import { TReactNode } from '@/types/externalTypes/NextTypes'
import { UserTypes } from '@/types/UserTypes'
import { createContext, useContext, useEffect, useState } from 'react'

const UseAuth = createContext<AuthTypes.IAuthContextType | undefined>(undefined)

export const UseAuthProvider = ({ children }: TReactNode) => {
	const [user, setUser] = useState<UserTypes.TResponseUserDto | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const isAuthenticated = !!user

	const fetchUser = async (username?: string) => {
		if (username) return await getUserByUsername(username)

		const response = await getCurrentAuthenticatedUser()
		setIsLoading(false)
		console.log('FETCH RESPONSE:', response)

		if (response.access) {
			console.log(response.data)
			setUser(response.data.userData)
			console.log('ACCESS')
			return
		}
		console.log('continuer')
	}

	const login = async (credentials: UserTypes.TLoginDto) => {
		const res = await axios.post('/auth/login', credentials)
		console.log(res)
		setUser(res.data)
	}

	const register = async (data: UserTypes.TRegisterDto) => {
		const res = await axios.post('/auth/register', data)
		console.log('Register response: ', res)
		if (res.status === 201) {
			setUser(res.data)
		}
	}

	const logout = async () => {
		setUser(null)
		return await axios.post('/auth/logout')
	}

	useEffect(() => {
		const setTokenAndFetchUser = async () => {
			await fetchUser().catch(err => console.error('[Fetch Error] : ', err))
		}
		setTokenAndFetchUser()
	}, [])

	return (
		<UseAuth.Provider
			value={{
				user,
				isLoading,
				isAuthenticated,
				fetchUser,
				login,
				register,
				logout,
			}}
		>
			{children}
		</UseAuth.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(UseAuth)
	if (!context) throw new Error('useAuth within UseAuthProvider')
	return context
}
