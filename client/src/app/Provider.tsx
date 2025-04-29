'use client'

import { UseConnectServerProvider } from '@/hooks/context/chat/useConnectServer'
import { UseThemeContextProvider } from '@/hooks/context/theme'
import { UsePinProvider } from '@/hooks/context/usePin'
import { UseAuthProvider } from '@/hooks/context/user/useAuth'
import { TReactNode } from '@/types/externalTypes/NextTypes'

export const GlobalProvider = ({ children }: TReactNode) => {
	return (
		<UseAuthProvider>
			<UseThemeContextProvider>
				<UseConnectServerProvider>
					<UsePinProvider>{children}</UsePinProvider>
				</UseConnectServerProvider>
			</UseThemeContextProvider>
		</UseAuthProvider>
	)
}
