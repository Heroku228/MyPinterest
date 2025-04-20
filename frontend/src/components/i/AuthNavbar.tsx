import { useAuth } from '@/hooks/context/user/useAuth'
import { LogIn, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { AccountInfoModal } from '../modal/AccountInfoModal'

export const AuthNavbar = () => {
	const { isAuth, setIsAuth } = useAuth()

	const [showModal, setShowModal] = useState<boolean>(false)

	return (
		<div className='col-span-1 mt-2 mr-6 ml-auto fixed right-0'>
			{isAuth ? (
				<div className='relative'>
					<Image
						onClick={() => {
							setShowModal(!showModal)
						}}
						src={'/logo.jpeg'}
						alt='account logo'
						width={45}
						height={45}
						className='rounded-full border border-black cursor-pointer'
					/>

					{showModal ? (
						<AccountInfoModal
							username={'Heroku228'}
							email={'heroku@yandex.com'}
							online={true}
						/>
					) : (
						''
					)}
				</div>
			) : (
				<>
					<LogIn width={'30px'} height={'20px'} className='text-white' />
					<LogOut width={'30px'} height={'20px'} className='text-white' />
				</>
			)}
		</div>
	)
}
