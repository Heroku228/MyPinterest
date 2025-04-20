import { IUser } from '@/types/IUser/IUser'
import { CircleCheckBig, CircleMinus } from 'lucide-react'
import Image from 'next/image'

export const UserInfo = ({ username, email, online }: Partial<IUser>) => {
	return (
		<>
			<div className='flex gap-4  p-1 border-b border-purple-500'>
				<Image
					src={'/logo.jpeg'}
					alt='account logo'
					width={45}
					height={0}
					className='rounded-full mb-auto border border-black cursor-pointer'
				/>
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
