import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { useEffect, useState } from 'react'
import { AnotherUserInfo } from '../AnotherUserInfo'
import { CurrentUserInfo } from '../CurrentUserInfo'
import { AccountSidebarButtons } from './subcomponents/AccountSidebarButtons'

export const AccountSidebar = ({
	isMobileVersion,
}: {
	isMobileVersion: boolean
}) => {
	const [scrollY, setScrollY] = useState(0)
	const { fetchUser } = useAuth()
	const { paramsUsername } = useParamsContext()

	const [anotherUser, setAnotherUser] =
		useState<UserTypes.TResponseUserDto | null>()

	useEffect(() => {
		const handleFetch = async () => {
			console.log('TEST')
			const response = await fetchUser(paramsUsername)
			console.log('ACCOUNT SIDEBAR RESPONSE: ', response)

			if (!response) return

			setAnotherUser(response.data)
		}

		handleFetch()
	}, [paramsUsername])

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
				{anotherUser ? (
					<AnotherUserInfo
						showUsername
						showEmail
						showIcon
						link='/profile-settings'
						size={250}
						additionalStyles='flex-col'
						userData={anotherUser}
					/>
				) : (
					<CurrentUserInfo
						showUsername
						showEmail
						showIcon
						link='/profile-settings'
						size={250}
						additionalStyles='flex-col'
					/>
				)}

				<AccountSidebarButtons isMobileVersion={isMobileVersion} />
			</div>
		</aside>
	)
}
