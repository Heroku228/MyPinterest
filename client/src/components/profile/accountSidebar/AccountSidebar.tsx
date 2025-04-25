import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { useEffect, useState } from 'react'
import { AccountSidebarWrapper } from './subcomponents/AccountSidebarWrapper'

export const AccountSidebar = ({
	isMobileVersion,
}: {
	isMobileVersion: boolean
}) => {
	const [scrollY, setScrollY] = useState(0)
	const { fetchUser } = useAuth()
	const { paramsUsername } = useParamsContext()

	const [anotherUser, setAnotherUser] =
		useState<UserTypes.TResponseUserDto | null>(null)

	useEffect(() => {
		const handleFetch = async () => {
			if (paramsUsername) {
				console.log('TEST')
				const response = await fetchUser(paramsUsername)
				console.log('ACCOUNT SIDEBAR RESPONSE: ', response)

				if (!response) return

				setAnotherUser(response.data)
			} else {
				await fetchUser()
			}
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
				transform: isMobileVersion ? '' : `translateY(${scrollY * 1}px)`,
				transition: isMobileVersion ? '' : 'transform 0.9s ease-out',
			}}
			className={`flex flex-col gap-6 mr-10 input-r-25 chat-sidebar-background-color p-8 h-max rounded-md
	  	${isMobileVersion ? '' : 'max-w-xs'}`}
		>
			<AccountSidebarWrapper
				anotherUser={anotherUser}
				isMobileVersion={false}
			/>
		</aside>
	)
}
