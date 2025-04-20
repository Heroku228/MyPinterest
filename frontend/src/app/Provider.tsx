'use client'

import { UseThemeContextProvider } from '@/hooks/context/theme'
import { UseAuthProvider } from '@/hooks/context/user/useAuth'
import { TReactNode } from '@/types/externalTypes/NextTypes'

export const GlobalProvider = ({ children }: TReactNode) => {
	return (
		<UseAuthProvider>
			<UseThemeContextProvider>{children}</UseThemeContextProvider>
		</UseAuthProvider>
	)
}
