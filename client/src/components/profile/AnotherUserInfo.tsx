import { UPLOADS } from '@/constants/routes'
import { UserTypes } from '@/types/UserTypes'
import Image from 'next/image'
import Link from 'next/link'

export const AnotherUserInfo= ({
	showUsername,
	showEmail,
	showIcon,
	link,
	additionalStyles,
	size,
	userData,
}: UserTypes.TAnotherUserInfo) => {
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
						src={`${UPLOADS.AVATARS}${userData?.userIconUrl}`}
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
					<p className='text-white font-medium text-lg'>{userData?.username}</p>
				) : null}
			</div>

			{showEmail ? (
				<p className='italic text-sm text-center'>{userData?.email}</p>
			) : null}
		</Link>
	)
}
