import { TReactNode } from '@/types/externalTypes/NextTypes'
import { createContext, useContext, useState } from 'react'

const UseThemeContext = createContext<any>(undefined)

export const UseThemeContextProvider = ({ children }: TReactNode) => {
	const [darkTheme, setDarkTheme] = useState<boolean>(false)

	return (
		<UseThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
			{children}
		</UseThemeContext.Provider>
	)
}

export const useThemeContext = () => {
	const context = useContext(UseThemeContext)

	if (!context)
		throw new Error(
			'UseThemeContext must be used within an UseThemeContextProvider'
		)

	return context
}
