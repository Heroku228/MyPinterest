'use client'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { RenderUserData } from '../profile/RenderUserData'
import { SiteLogo } from '../SiteLogo'
import { HeaderList } from './List/HeaderList'

export const Header = () => {
	const { isAuthenticated, user } = useAuth()
	const router = useRouter()

	return (
		<header className='grid grid-cols-6 items-center rounded-xl header-bg-color justify-around w-full py-3 px-8 shadow-md text-white overflow-x-hidden'>
			<div className='col-span-1'>
				<SiteLogo />
			</div>

			<div className='col-span-4'>
				<HeaderList />
			</div>

			{isAuthenticated && user ? (
				<div
					className='transition-bg col-span-1 duration-300 background-gray-hover flex w-full overflow-hidden px-8 rounded-lg w-max ml-auto'
					onClick={() => window.location.reload()}
				>
					<RenderUserData
						showEmail={false}
						showUsername
						showIcon
						size={60}
						userData={user}
						link={ROUTES.PROFILE(user?.username)}
					/>
				</div>
			) : (
				<div
					className='flex items-center justify-center gap-4 transition-color duration-300 chat-sidebar-background-color cursor-pointer py-2 px-4 rounded-xl'
					onClick={() => router.push('/auth')}
				>
					<LogIn width={'30px'} height={'20px'} className='text-white' />
					<span className='text-white font-bold text-xl'>Log in</span>
				</div>
			)}
		</header>
	)
}
