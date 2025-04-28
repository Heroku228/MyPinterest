import { SpanProps } from '@/types/UI-types/UIComponentsProps'

export const Span: React.FC<SpanProps> = ({ additionalStyles, ...props }) => {
	return (
		<span
			className={`font-bold text-2xl duration-300 transition-color hover:text-purple-900 cursor-pointer ${additionalStyles}`}
			{...props}
		></span>
	)
}
