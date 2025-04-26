import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserOnlineStatus } from './UserOnlineStatus'

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
	showOnlineStatus,
}: UserTypes.TVisibleUserData & {
	imageStyles?: string
	showOnlineStatus?: boolean
}) => {
	const [userInfo, setUserInfo] = useState<UserTypes.TResponseUserDto | null>(
		null
	)
	const { user } = useAuth()

	useEffect(() => {
		if (userData) {
			console.log('USER ICON URL: ', user?.userIconUrl)
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
					<Image
						unoptimized
						width={size}
						height={size}
						src={`http://localhost:3000/api/v1/uploads/avatars/${userInfo?.userIconUrl}`}
						alt='account logo'
						priority
						className={`rounded-full border border-black cursor-pointer
							${imageStyles}`}
					/>
				) : null}

				<div className='flex gap-2'>
					{showOnlineStatus ? (
						<UserOnlineStatus showOnlineStatus={true} />
					) : null}

					{showUsername ? (
						<p className='text-white font-medium cursor-pointer text-lg'>
							{userInfo?.username}
						</p>
					) : null}
				</div>
			</div>

			{showEmail ? (
				<p className='italic text-sm cursor-pointer text-center'>
					{userInfo?.email}
				</p>
			) : null}

			{description ? (
				<p className='text-center mx-auto default-border rounded-xl p-2 m-4 font-bold italic text-md overflow-hidden max-w-80 max-h-30'>
					{description}
				</p>
			) : null}
		</Link>
	)
}
