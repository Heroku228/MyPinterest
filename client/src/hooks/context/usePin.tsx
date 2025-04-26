import { ContextTypes } from '@/types/ContextTypes/ContextTypes'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { createContext, ReactNode, useContext, useState } from 'react'

const UsePinContext = createContext<ContextTypes.TUsePin | null>(null)

export const UsePinProvider = ({ children }: { children: ReactNode }) => {
	const [pin, setPin] = useState<PinTypes.IPin | null>(null)

	if (!pin) return

	return (
		<UsePinContext.Provider value={{ pin, setPin }}>
			{children}
		</UsePinContext.Provider>
	)
}

export const usePin = () => {
	const context = useContext(UsePinContext)
	if (!context) throw new Error('usePin must be used within UsePinProvider')
	return context
}
