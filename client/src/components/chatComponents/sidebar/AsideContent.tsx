import { RenderUserData } from '@/components/profile/RenderUserData'
import { SiteLogo } from '@/components/SiteLogo'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { PanelRightOpen } from 'lucide-react'
import { useState } from 'react'
import { HideSidebarArrow } from './HideSidebarArrow'
import { MappedAvailableChats } from './MappedAvailableChats'

export const AsideContent = () => {
	const [hideSidebar, setHideSidebar] = useState<boolean>(false)

	const { isAuthenticated, user } = useAuth()

	const toggleSidebar = () => {
		setHideSidebar(!hideSidebar)
	}

	return hideSidebar ? (
		<div
			className='fixed cursor-pointer items-center bg-black p-2 mt-4 ml-6 rounded-md flex gap-2 hover:scale-102 duration-150 active:scale-95 
			bg-gradient-to-r from-blue-600 via-purple-500 to-purple-500 font-bold
			'
			onClick={toggleSidebar}
		>
			<span className='text-white'>Show sidebar</span>
			<PanelRightOpen className='text-white' />
		</div>
	) : (
		<aside className='flex flex-col fixed w-max h-full border-r-1 chat-sidebar-border backdrop-blur-lg chat-sidebar-background-color p-2'>
			<div className='flex items-center gap-4 py-2 site-logo-border'>
				<SiteLogo />
				<HideSidebarArrow toggleSidebar={toggleSidebar} />
			</div>
			<div className='h-full flex py-10 px-2 flex-col gap-8'>
				<MappedAvailableChats />
			</div>
			{isAuthenticated && user ? (
				<div className='chat-sidebar-border-top py-1 px-2 w-full m-auto transition-colors duration-300 background-gray-hover'>
					<RenderUserData
						showEmail={false}
						showUsername
						showIcon={true}
						link={ROUTES.PROFILE(user?.username)}
						size={50}
					/>
				</div>
			) : null}
		</aside>
	)
}
