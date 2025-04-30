import { Loader } from '@/components/ui/Loader'
import { Span } from '@/components/ui/Span'
import { ROUTES, UPLOADS } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import axios from '@/services/axiosInstance'
import { UserTypes } from '@/types/UserTypes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AccountSidebarButtons } from './AccountSidebarButtons'

export const AccountSidebarWrapper = ({
	anotherUser,
}: {
	anotherUser: UserTypes.TResponseUserDto | null | undefined
}) => {
	const params = usePathname()
	const { user, isLoading, isAuthenticated } = useAuth()
	const usernameFromUrl = params.replace('/profile/', '')

	const [showHint, setShowHint] = useState<boolean>(false)
	const [isChangedIcon, setIsChangedIcon] = useState(false)
	const [disabledChangeIcon, setDisableChangeIcon] = useState<boolean>(false)

	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleChangeIcon = async () => {
		fileInputRef.current?.click()
	}

	const finalUser = anotherUser || user

	const changeUserIcon = async () => {
		const file = fileInputRef.current?.files?.[0]

		if (!file) return

		const formData = new FormData()
		formData.append('icon', file)

		const response = await axios
			.post('users/change-user-icon', formData)
			.catch(err => console.error(err))

		if (!response) return

		if (finalUser && response.status === 201) {
			finalUser.userIconUrl = response.data.filePath
			setIsChangedIcon(true)
		}
	}

	useEffect(() => {
		if (!isAuthenticated || usernameFromUrl !== user?.username) {
			setDisableChangeIcon(true)
		}
	}, [])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex flex-col items-center p-4 rounded-2xl gap-4'>
					<input
						disabled={disabledChangeIcon}
						ref={fileInputRef}
						onChange={changeUserIcon}
						accept='image/*'
						type='file'
						name='icon'
						id='icon'
						className='hidden'
					/>
					<div
						className='relative w-64 h-64 rounded-full border-2 border-gray-700 cursor-pointer hover:brightness-70 transition duration-300'
						onClick={handleChangeIcon}
						onMouseEnter={() => setShowHint(true)}
						onMouseLeave={() => setShowHint(false)}
					>
						{showHint && usernameFromUrl === user?.username ? (
							<Span className='text-white z-999 bg-black py-2 px-4 rounded-full absolute text-lg bottom-0 -right-25'>
								Change Icon
							</Span>
						) : null}

						<Image
							className='rounded-full object-cover duration-300 transition-opacity'
							unoptimized
							fill
							alt='user icon'
							src={`${
								isChangedIcon
									? finalUser?.userIconUrl
									: `${UPLOADS.AVATARS}${finalUser?.username}/${finalUser?.userIconUrl}`
							}`}
						/>
					</div>

					<h1 className='text-center text-lg lg:text-xl font-bold text-purple-400'>
						{finalUser?.username}
					</h1>
					<h2 className='text-center text-lg lg:text-xl italic text-purple-400'>
						{finalUser?.email}
					</h2>

					{user?.username === usernameFromUrl ? (
						<AccountSidebarButtons />
					) : null}

					<Link
						href={ROUTES.USERS}
						className='italic text-md lg:text-lg absolute bottom-3 right-5'
					>
						Other users
					</Link>
				</div>
			)}
		</>
	)
}
