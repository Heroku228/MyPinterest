import { useParamsContext } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { useEffect, useState } from 'react'
import { AccountSidebarWrapper } from './subcomponents/AccountSidebarWrapper'

export const AccountSidebar = ({}) => {
	const [scrollY, setScrollY] = useState(0)
	const { fetchUser } = useAuth()
	const { paramsUsername } = useParamsContext()

	const [anotherUser, setAnotherUser] =
		useState<UserTypes.TResponseUserDto | null>()

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
		let ticking = false
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setScrollY(window.scrollY)
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<aside
			style={{
				transform: `translateY(${scrollY * 1}px)`,
				transition: 'transform 1s ease-in',
			}}
			className={`flex flex-col gap-6 mr-10 input-r-25 chat-sidebar-background-color p-8 h-max rounded-md`}
		>
			<AccountSidebarWrapper anotherUser={anotherUser} />
		</aside>
	)
}
