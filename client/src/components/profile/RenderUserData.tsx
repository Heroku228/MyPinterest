import { UPLOADS } from '@/constants/routes'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { CircleCheckBigIcon, CircleMinus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const RenderUserData = ({
	showUsername,
	showEmail,
	showIcon,
	link,
	additionalStyles,
	size,
	userData,
	description,
	imageStyles,
}: UserTypes.TVisibleUserData & { imageStyles?: string }) => {
	const [userInfo, setUserInfo] = useState<UserTypes.TResponseUserDto | null>(
		null
	)

	const { isConnected } = useConnectServer()
	const { user } = useAuth()

	useEffect(() => {
		console.log('USER DATA: ', userData)
		if (userData) {
			setUserInfo(userData)
		} else {
			setUserInfo(user)
		}
	}, [userData, user])

	return (
		<Link href={link ? link : ''} className='flex flex-col py-1 cursor-default'>
			<div
				className={`
				flex items-center gap-4 mb-1
				${additionalStyles}
				`}
			>
				{showIcon ? (
					<img
						src={`${UPLOADS.AVATARS}${userInfo?.userIconUrl}`}
						alt='account logo'
						className={`rounded-full border border-black cursor-pointer
							w-[${size}px] h-[${size}px] ${imageStyles}`}
					/>
				) : null}
				{showUsername ? (
					<div className='flex items-center gap-3'>
						{isConnected ? (
							<CircleCheckBigIcon className='text-green-400' />
						) : (
							<CircleMinus className='text-red-500' />
						)}

						<p className='text-white font-medium cursor-pointer text-lg'>
							{userInfo?.username}
						</p>
					</div>
				) : null}
			</div>

			{showEmail ? (
				<p className='italic text-sm cursor-pointer text-center'>
					{userInfo?.email}
				</p>
			) : null}

			{description ? (
				<p className='text-center default-border rounded-xl p-2 m-4 font-bold italic text-md overflow-hidden max-w-80 max-h-56'>
					{description}
				</p>
			) : null}
		</Link>
	)
}
