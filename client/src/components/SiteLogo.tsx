'use client'

import { ROUTES } from '@/constants/routes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const SiteLogo = () => {
	const router = useRouter()

	return (
		<div
			onClick={() => router.push(ROUTES.HOME)}
			className='flex items-center gap-4 cursor-pointer'
		>
			<Image
				src={'/firefox-browser.svg'}
				alt='app-icon'
				width={40}
				height={40}
			/>
			<h1 className='text-white text-3xl cursor-pointer'>SilkSong</h1>
		</div>
	)
}
