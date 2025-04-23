import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useAuth } from '@/hooks/context/user/useAuth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

export const AccountSidebar = () => {
	const { user, logout } = useAuth()
	const [hoverIcon, setHoverIcon] = useState<boolean | null>(null)
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		console.log('USER2: ', user)
	}, [])

	const handleShowIconHint = () => {
		setHoverIcon(true)
	}

	return (
		<aside
			style={{
				transform: `translateY(${scrollY * 0.9}px)`,
				transition: 'transform 0.2s ease-out',
			}}
			className='flex flex-col max-w-xs gap-6 mr-10 input-r-25 chat-sidebar-background-color p-8 h-max rounded-md'
		>
			<div
				onMouseEnter={() => setHoverIcon(true)}
				onMouseLeave={() => setHoverIcon(false)}
				className={`relative h-[250px] w-[250px] user-icon-border cursor-pointer rounded-full mb-4`}
			>
				<Image
					className='rounded-full object-cover'
					src={`http://127.0.0.1:3000/api/v1/uploads/avatars/${user?.userIconUrl}`}
					alt='user icon'
					fill
				/>

				{hoverIcon ? (
					<span className='absolute italic text-sm bg-black-50 py-1 px-2 rounded-xl -bottom-7 left-1/5'>
						Change your avatar
					</span>
				) : null}
			</div>

			<div>
				<h1 className='font-bold text-2xl'>{user?.username}</h1>
				<h2 className='text-gray-300'>{user?.email}</h2>
			</div>

			<div className='flex flex-col gap-2 items-start'>
				<Button
					variant={STYLES_VARIANTS.SECONDARY}
					additionalStyles='from-purple-400 via-blue-500 to-indigo-700'
					onClick={logout}
				>
					Logout
				</Button>
				<Button variant={STYLES_VARIANTS.SECONDARY} onClick={logout}>
					Edit profile
				</Button>
			</div>
		</aside>
	)
}
