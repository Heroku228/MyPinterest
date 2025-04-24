import { useAuth } from '@/hooks/context/user/useAuth'
import { useEffect, useState } from 'react'
import { CurrentUserInfo } from '../CurrentUserInfo'
import { AccountSidebarButtons } from './subcomponents/AccountSidebarButtons'

export const AccountSidebar = ({
	isMobileVersion,
}: {
	isMobileVersion: boolean
}) => {
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		if (!isMobileVersion) return

		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<aside
			style={{
				transform: isMobileVersion ? '' : `translateY(${scrollY * 0.9}px)`,
				transition: isMobileVersion ? '' : 'transform 0.2s ease-out',
			}}
			className={`flex flex-col gap-6 mr-10 input-r-25 chat-sidebar-background-color p-8 h-max rounded-md
				${isMobileVersion ? '' : 'max-w-xs'}
				
		`}
		>
			<div>
				<div className='mb-10'>
					<CurrentUserInfo
						showUsername
						showEmail
						showIcon
						link='/profile-settings'
						size={250}
						additionalStyles='flex-col'
					/>
				</div>

				<AccountSidebarButtons isMobileVersion={isMobileVersion} />
			</div>
		</aside>
	)
}
