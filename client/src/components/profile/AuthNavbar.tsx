import { ROUTES, UPLOADS } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AccountInfoModal } from '../modal/AccountInfoModal'

export const AuthNavbar = () => {
	const { isAuthenticated, user } = useAuth()

	const [showModal, setShowModal] = useState<boolean>(false)

	const router = useRouter()

	return (
		<div className='col-span-1 mt-2 mr-6 ml-auto fixed right-0'>
			{isAuthenticated ? (
				<div className='relative'>
					<Image
						onClick={() => {
							setShowModal(!showModal)
						}}
						src={`${UPLOADS.AVATARS}${user?.userIconUrl}`}
						alt='account logo'
						width={60}
						height={60}
						className='rounded-full border border-black cursor-pointer'
					/>

					{showModal ? (
						<AccountInfoModal
							username={user?.username}
							email={user?.email}
							online={true}
						/>
					) : null}
				</div>
			) : (
				<div
					className='flex items-center justify-center gap-4 transition-color duration-300 chat-sidebar-background-color cursor-pointer py-2 px-4 rounded-xl'
					onClick={() => router.push(ROUTES.REGISTER)}
				>
					<LogIn width={'30px'} height={'20px'} className='text-white' />
					<span className='text-white font-bold text-xl'>Log in</span>
				</div>
			)}
		</div>
	)
}
