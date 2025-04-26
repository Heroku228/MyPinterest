'use client'
import {
	getCurrentAuthenticatedUser,
	getUserByUsername,
} from '@/services/auth/handleFetchUser'
import axios from '@/services/axiosInstance'
import { sendErrorMessage } from '@/services/fetchResponse'
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

		try {
			const response = await getCurrentAuthenticatedUser()

			console.log('FETCHUSER RESPONSE: ', response)
			setIsLoading(false)

			if (response.access) {
				setUser(response.data.userData)

				if (typeof window !== undefined) {
					const responseUserData = response.data.userData

					const userDataForJson = {
						// username: responseUserData?.username,
						username: 'test',
						email: responseUserData?.email,
						userIconUrl: responseUserData?.userIconUrl,
					}

					localStorage.setItem('user_profile', JSON.stringify(userDataForJson))
				}
				return response.data.userData
			}
		} catch (err) {
			console.log('[FETCH USER ERROR] ', err)
		} finally {
			setIsLoading(false)
		}
	}

	const login = async (credentials: UserTypes.TLoginDto) => {
		const res = await axios.post('/auth/login', credentials)
		if (res.status === 200) setUser(res.data)
		else return sendErrorMessage(res)
	}

	const register = async (data: UserTypes.TRegisterDto) => {
		const res = await axios.post('/auth/register', data)
		if (res.status === 201) {
			setUser(res.data)
		}
	}

	const logout = async () => {
		console.log('LOGIN')
		setUser(null)
		return await axios.post('/auth/logout')
	}

	useEffect(() => {
		const setTokenAndFetchUser = async () => {
			if (typeof window !== 'undefined') {
				const storedUser = localStorage.getItem('user_profile')

				if (storedUser) {
					setUser(JSON.parse(storedUser))
					setIsLoading(false)
				}
			}
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
