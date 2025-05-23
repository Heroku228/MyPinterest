'use client'

import { ROUTES } from '@/constants/routes'
import {
	headerFlexStyles,
	headerGridStyles,
} from '@/constants/styles/headerStyles'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useWindowSize } from '@/hooks/useWindowSize'
import { LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { RenderUserData } from '../profile/RenderUserData'
import { SiteLogo } from '../SiteLogo'
import { HeaderList } from './List/HeaderList'

export const Header = () => {
	const { isAuthenticated, user } = useAuth()
	const { width } = useWindowSize()
	const router = useRouter()

	return (
		<header className={`${width < 720 ? headerFlexStyles : headerGridStyles}`}>
			{width < 1400 ? null : (
				<div className='col-span-1 cursor-pointer background-gray-hover w-max py-1 px-4 rounded-md'>
					<SiteLogo />
				</div>
			)}

			<div className={`col-span-4`}>
				<HeaderList />
			</div>

			{width < 720 ? null : (
				<>
					{isAuthenticated && user ? (
						<div
							className='transition-bg col-span-1 duration-300 background-gray-hover flex w-full overflow-hidden px-8 rounded-lg w-max ml-auto cursor-pointer'
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
							className='col-span-1 gap-4 transition-color duration-300 chat-sidebar-background-color cursor-pointer py-2 px-4 rounded-xl'
							onClick={() => router.push('/auth')}
						>
							<div
								className={`flex items-center w-max gap-4 cursor-pointer background-gray-hover p-1 px-5 rounded-md`}
							>
								<LogIn width={'30px'} height={'20px'} className='text-white' />
								<span className='text-white font-bold text-xl'>Log in</span>
							</div>
						</div>
					)}
				</>
			)}
		</header>
	)
}
