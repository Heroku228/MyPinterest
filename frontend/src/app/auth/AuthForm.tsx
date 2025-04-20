import { useState } from 'react'
import { AuthenticatioSection } from './form/AuthenticationSection'
import { SideImage } from './form/SideImage'

export const AuthForm = () => {
	const [showRegister, setShowRegister] = useState<boolean>(false)

	return (
		<div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-2xl flex flex-col gap-12 min-h-150 chat-sidebar-background-color '>
			<main className='flex gap-8 min-h-150'>
				{showRegister ? (
					<>
						<SideImage
							className='h-full max-w-xs rounded-md input-r-25'
							imageUrl='/bg/bg-1.jpg'
						/>
						<AuthenticatioSection
							showRegister={showRegister}
							setShowRegister={setShowRegister}
						/>
					</>
				) : (
					<>
						<AuthenticatioSection
							showRegister={showRegister}
							setShowRegister={setShowRegister}
						/>
						<SideImage
							className='h-full max-w-xs rounded-md input-l-25'
							imageUrl='/bg/bg-3.jpg'
						/>
					</>
				)}
			</main>
		</div>
	)
}
