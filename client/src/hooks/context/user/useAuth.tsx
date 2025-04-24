'use client'
import {
	getCurrentAuthenticatedUser,
	getUserByUsername,
} from '@/services/auth/handleFetchUser'
import { AuthTypes } from '@/types/AuthTypes/AuthTypes'
import { TReactNode } from '@/types/externalTypes/NextTypes'
import { UserTypes } from '@/types/UserTypes'
import axios from 'axios'
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

		if (response.access) setUser(response.data)
	}

	const login = async (credentials: UserTypes.TLoginDto) => {
		const res = await axios.post(
			'http://localhost:3000/api/v1/auth/login',
			credentials
		)
		
		localStorage.setItem('token', res.data.access_token)

		axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${res.data.access_token}`
		setUser(res.data.user)
	}

	const register = async (data: UserTypes.TRegisterDto) => {
		const res = await axios.post(
			'http://localhost:3000/api/v1/auth/register',
			JSON.stringify(data),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		if (res.status === 201) {
			setUser(res.data)
			localStorage.setItem('token', res.data.access_token)
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${res.data.access_token}`
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	useEffect(() => {
		const setTokenAndFetchUser = async () => {
			const token = localStorage.getItem('token')

			if (token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

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
