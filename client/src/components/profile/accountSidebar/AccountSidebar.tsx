import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useWindowSize } from '@/hooks/useWindowSize'
import { UserTypes } from '@/types/UserTypes'
import { useEffect, useState } from 'react'
import { AccountSidebarWrapper } from './subcomponents/AccountSidebarWrapper'

export const AccountSidebar = ({}) => {
	const [scrollY, setScrollY] = useState(0)
	const { fetchUser } = useAuth()
	const { paramsUsername } = useParamsContext()
	const { width } = useWindowSize()

	const [anotherUser, setAnotherUser] =
		useState<UserTypes.TResponseUserDto | null>(null)

	useEffect(() => {
		const handleFetch = async () => {
			if (paramsUsername) {
				const response = await fetchUser(paramsUsername)
				if (!response) return

				setAnotherUser(response.data)
			} else {
				await fetchUser()
			}
		}

		handleFetch()
	}, [paramsUsername])

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<aside
			style={{
				transform: `translateY(${scrollY * 1}px)`,
				transition: 'transform 0.9s ease-out',
			}}
			className={`flex flex-col gap-6 mr-10 input-r-25 chat-sidebar-background-color p-8 h-max rounded-md`}
		>
			<AccountSidebarWrapper anotherUser={anotherUser} />
		</aside>
	)
}
