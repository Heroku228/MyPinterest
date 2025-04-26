import { AuthTypes } from '@/types/AuthTypes/AuthTypes'

export const Hint = ({ message, hint, link }: AuthTypes.TAuthHint) => {
	return (
		<div
			className={`chat-sidebar-background-color absolute bottom-0 flex gap-1 mb-4 ml-1`}
		>
			<span className='text-xs text-gray-300 font-bold flex h-full mt-auto'>
				{message}
			</span>
			<span
				onClick={() => hint.setShowHint(!hint.showHint)}
				className='text-xs font-bold underline-before cursor-pointer hover:text-purple-400'
			>
				{link}
			</span>
		</div>
	)
}
