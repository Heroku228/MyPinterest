import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { CircleCheckBig, CircleMinus } from 'lucide-react'
import Image from 'next/image'

export const UserInfo = ({
	username,
	email,
	online,
}: Partial<UserTypes.TResponseUserDto & { online: boolean }>) => {
	const { user } = useAuth()
	return (
		<>
			<div className='flex gap-4 p-1 border-b border-purple-500'>
				<div className='relative w-[60px] h-[60px]'>
					<Image
						unoptimized
						src={`http://localhost:3000/api/v1/uploads/avatars/${user?.userIconUrl}`}
						alt='account logo'
						fill
						className='rounded-full mb-auto border border-black cursor-pointer'
					/>
				</div>
				<div>
					<h1 className='text-lg'>{username}</h1>
					<span className='text-sm'>{email}</span>
				</div>
				{online ? (
					<CircleCheckBig className='text-green-400' />
				) : (
					<CircleMinus className='text-red-400' />
				)}
			</div>
		</>
	)
}
