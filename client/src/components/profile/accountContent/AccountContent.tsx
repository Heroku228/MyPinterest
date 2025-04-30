import { PINS_ROUTER } from '@/constants/routes'
import axios from '@/services/axiosInstance'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RenderAllPins } from './subcomponents/AllPins'

export const AccountContent: React.FC = () => {
	const [pinsUrls, setPinsUrls] = useState<string[]>([])
	const urlParams = usePathname()

	useEffect(() => {
		const usernameFromUrl = urlParams.replace('/profile/', '')

		if (!usernameFromUrl) return

		const getUserPins = async () => {
			const response = await axios
				.get(`${PINS_ROUTER.GET_USER_PINS}/${usernameFromUrl}`)
				.catch(err => console.error(err))

			if (response) setPinsUrls(response.data)
		}
		getUserPins()
	}, [])

	return (
		<section className='flex flex-col gap-10 overflow-x-hidden'>
			<RenderAllPins />
		</section>
	)
}
