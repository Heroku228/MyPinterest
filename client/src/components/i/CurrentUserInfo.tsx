import { useAuth } from '@/hooks/context/user/useAuth'
import { TVisibleUserData } from '@/types/IUser/UserData'
import Image from 'next/image'
import Link from 'next/link'

export const CurrentUserInfo = ({
	showUsername,
	showEmail,
	showIcon,
	link,
	additionalStyles,
	size,
}: TVisibleUserData) => {
	const { user } = useAuth()

	return (
		<Link href={link ? link : ''} className='flex flex-col py-1 '>
			<div
				className={`
				flex items-center gap-4 mb-1
				${additionalStyles}
				`}
			>
				{showIcon ? (
					<Image
						src={`http://127.0.0.1:3000/api/v1/uploads/avatars/${user?.userIconUrl}`}
						alt='account logo'
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
