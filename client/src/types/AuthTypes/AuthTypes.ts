import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { InputProps } from '../UI-types/UIComponentsProps'
import { TShowHint } from '../externalTypes/NextTypes'

export namespace AuthTypes {
	export type TAuthDiv = {
		Image: LucideIcon
		inputProps: InputProps
		children?: ReactNode
	}

	export type TAuthHint = {
		hint: TShowHint,
		message: string,
		link: string
	}
}
