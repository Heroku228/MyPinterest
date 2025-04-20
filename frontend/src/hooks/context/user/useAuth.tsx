import { TReactNode } from '@/types/externalTypes/NextTypes'
import { createContext, useContext, useState } from 'react'

const UseAuth = createContext<any>(undefined)

export const UseAuthProvider = ({ children }: TReactNode) => {
	const [isAuth, setIsAuth] = useState<boolean>(true)

	return (
		<UseAuth.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</UseAuth.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(UseAuth)

	if (!context) throw new Error('useAuth within UseAuthProvider')

	return context
}
