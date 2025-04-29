import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, LiHTMLAttributes, RefObject, TextareaHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & AdditionalAttributes
export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & AdditionalAttributes & {
	ref?: RefObject<HTMLTextAreaElement | null> | null
}

export type LiProps = LiHTMLAttributes<HTMLLIElement> & AdditionalAttributes


export type SpanProps = HTMLAttributes<HTMLSpanElement> & AdditionalAttributes

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { ref?: RefObject<HTMLInputElement | null> | null } & AdditionalAttributes

export type MessageTextProps = HTMLAttributes<HTMLParagraphElement>

type AdditionalAttributes = {
	additionalStyles?: string
	variant?: STYLES_VARIANTS
}
