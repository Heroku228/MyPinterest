import { TReactNode } from '@/types/externalTypes/NextTypes'

export const OAuthBlock = ({ children }: TReactNode) => {
	return (
		<div className='background-gray-hover cursor-pointer chat-sidebar-border rounded-2xl p-1 '>
			{children}
		</div>
	)
}
