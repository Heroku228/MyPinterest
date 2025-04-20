import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, RefObject, TextareaHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & AdditionalAttributes
export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & AdditionalAttributes & {
	ref?: RefObject<HTMLTextAreaElement | null> | null
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { ref: RefObject<HTMLInputElement | null> | null }

export type MessageTextProps = HTMLAttributes<HTMLParagraphElement>

type AdditionalAttributes = {
	additionalStyles?: string
	variant?: STYLES_VARIANTS
}
