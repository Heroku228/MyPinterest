import { UPLOADS } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
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
	const { user, isLoading } = useAuth()

	if (!userData && (!user || isLoading)) return null
	const finalUser = userData || user

	return (
		<Link href={link ? link : ''} className='flex flex-col py-1 cursor-default'>
			<div
				className={twMerge(`
				flex items-center gap-4 mb-1
				${additionalStyles}
				`)}
			>
				{showIcon ? (
					<Image
						unoptimized
						width={size}
						height={size}
						src={`${UPLOADS.AVATARS}${finalUser?.userIconUrl}`}
						alt='account logo'
						priority
						className={twMerge(`rounded-full border border-black cursor-pointer
							${imageStyles}`)}
					/>
				) : null}

				<div className='flex gap-2'>
					{showOnlineStatus ? (
						<UserOnlineStatus showOnlineStatus={true} />
					) : null}

					{showUsername ? (
						<p className='text-white font-medium cursor-pointer text-lg'>
							{finalUser?.username}
						</p>
					) : null}
				</div>
			</div>

			{showEmail ? (
				<p className='italic text-sm cursor-pointer text-center'>
					{finalUser?.email}
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
