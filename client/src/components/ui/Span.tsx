import { SpanProps } from '@/types/UI-types/UIComponentsProps'

export const Span: React.FC<SpanProps> = ({ ...props }) => {
	return (
		<span
			className='font-bold text-2xl duration-300 transition-color hover:text-purple-900 cursor-pointer'
			{...props}
		></span>
	)
}
