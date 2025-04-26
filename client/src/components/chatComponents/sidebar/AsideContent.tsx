import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { chatSidebarAsideContentStyles } from '@/constants/styles/chatSidebarStyles'
import { PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import { MappedAvailableChats } from './MappedAvailableChats'

export const AsideContent = () => {
	const [hideSidebar, setHideSidebar] = useState<boolean>(true)
	const [showHint, setShowHint] = useState(false)

	const toggleSidebar = () => {
		setHideSidebar(!hideSidebar)
	}

	return (
		<aside className='col-span-1 h-max'>
			{hideSidebar ? (
				<div className={chatSidebarAsideContentStyles}>
					<div className='flex justify-end gap-4'>
						<PanelLeftClose
							onClick={() => {
								toggleSidebar()
								setShowHint(false)
							}}
							size={35}
							className='absolute text-indigo-400 right-4 cursor-pointer'
							onMouseEnter={() => setShowHint(true)}
							onMouseLeave={() => setShowHint(false)}
						/>
						{showHint ? (
							<span className='text-white absolute -right-30 italic bg-black py-1 px-3 text-lg'>
								Hide sidebar
							</span>
						) : null}
					</div>

					<MappedAvailableChats />
				</div>
			) : (
				<Button
					variant={STYLES_VARIANTS.SECONDARY}
					additionalStyles='p-3 text-xl w-max cursor-pointer mt-10 hover:scale-105'
					onClick={toggleSidebar}
				>
					Show sidebar
				</Button>
			)}
		</aside>
	)
}
