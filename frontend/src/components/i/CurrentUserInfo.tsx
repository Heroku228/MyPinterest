import { TVisibleUserData } from '@/types/IUser/UserData'
import Image from 'next/image'
import Link from 'next/link'

export const CurrentUserInfo = ({
	showUsername,
	showIcon,
	link,
	size,
}: TVisibleUserData) => {
	return (
		<Link href={link} className='flex py-2 justify-center items-center  gap-4 '>
			{showIcon ? (
				<Image
					src={'/logo.jpeg'}
					alt='account logo'
					width={size}
					height={size}
					className='rounded-full border border-black'
				/>
			) : (
				''
			)}
			{showUsername ? <p className='text-white font-medium'>Heroku228</p> : ''}
		</Link>
	)
}
