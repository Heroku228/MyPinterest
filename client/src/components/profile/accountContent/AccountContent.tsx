import { PINS_ROUTER } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import axios from '@/services/axiosInstance'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RenderAllPins } from './subcomponents/AllPins'

export const AccountContent = ({}: {}) => {
	const [pinsUrls, setPinsUrls] = useState<string[]>([])
	const urlParams = usePathname()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		const usernameFromUrl = urlParams.replace('/profile/', '')
		console.log(`${PINS_ROUTER.GET_USER_PINS}/${usernameFromUrl}`)

		if (!usernameFromUrl) return

		const getUserPins = async () => {
			const response = await axios
				.get(`${PINS_ROUTER.GET_USER_PINS}/${usernameFromUrl}`)
				.catch(err => console.error(err))
			setPinsUrls(response.data)
		}
		getUserPins()
	}, [])

	return (
		<section className='flex flex-col gap-10 overflow-x-hidden'>
			<RenderAllPins pins={pinsUrls} />
		</section>
	)
}
