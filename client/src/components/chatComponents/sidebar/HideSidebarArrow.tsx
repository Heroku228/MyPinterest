import { PanelLeftClose } from 'lucide-react'
import { useState } from 'react'

export const HideSidebarArrow = ({
	toggleSidebar,
}: {
	toggleSidebar: () => void
}) => {
	const [showHint, setShowHint] = useState<boolean>(false)

	return (
		<div className='rounded-xl ml-auto background-gray-hover relative cursor-pointer p-1'>
			{showHint ? (
				<span className='text-gray-400 absolute w-max p-1 bottom-0 rounded-md left-10'>
					Hide sidebar
				</span>
			) : (
				''
			)}
			<PanelLeftClose
				onMouseEnter={() => setShowHint(true)}
				onMouseLeave={() => setShowHint(false)}
				onClick={toggleSidebar}
				className='text-purple-600'
				size={25}
			/>
		</div>
	)
}
