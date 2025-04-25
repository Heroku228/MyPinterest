import axios from '@/services/axiosInstance'
import { useEffect, useState } from 'react'
import { RenderAllPins } from './subcomponents/AllPins'
import { RecentPins } from './subcomponents/RecentPins'

export const AccountContent = ({}: {}) => {
	const [pins, setPins] = useState<any[]>([])

	useEffect(() => {
		const fetchAllPins = async () => {
			const response = await axios.get('/uploads/all-pins')
			setPins(response.data.images)
		}
		fetchAllPins()
	}, [])

	return (
		<section className='flex flex-col gap-10 overflow-x-hidden'>
			<RecentPins pins={pins} />
			<RenderAllPins pins={pins} />
		</section>
	)
}
