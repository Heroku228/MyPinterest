import { UPLOADS } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import Image from 'next/image'
import Link from 'next/link'

export const CurrentUserInfo = ({
	showUsername,
	showEmail,
	showIcon,
	link,
	additionalStyles,
	size,
}: UserTypes.TVisibleUserData) => {
	const { user } = useAuth()

	return (
		<Link href={link ? link : ''} className='flex flex-col py-1'>
			<div
				className={`
				flex items-center gap-4 mb-1
				${additionalStyles}
				`}
			>
				{showIcon ? (
					<Image
						src={`${UPLOADS.AVATARS}${user?.userIconUrl}`}
						alt='account logo'
						priority
						width={size}
						height={size}
						className='rounded-full border border-black'
					/>
				) : (
					''
				)}
				{showUsername ? (
					<p className='text-white font-medium text-lg'>{user?.username}</p>
				) : null}
			</div>

			{showEmail ? (
				<p className='italic text-sm text-center'>{user?.email}</p>
			) : null}
		</Link>
	)
}
