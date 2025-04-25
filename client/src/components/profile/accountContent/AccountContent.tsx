import axios from 'axios'
import { useEffect, useState } from 'react'
import { RenderAllPins } from './subcomponents/AllPins'
import { RecentPins } from './subcomponents/RecentPins'

export const AccountContent = ({
	isMobileVersion,
}: {
	isMobileVersion: boolean
}) => {
	const [pins, setPins] = useState<any[]>([])

	useEffect(() => {
		const fetchAllPins = async () => {
			const response = await axios.get(
				'http://localhost:3000/api/v1/uploads/all-pins'
			)
			setPins(response.data.images)
		}
		fetchAllPins()
	}, [])

	return (
		<section className='flex flex-col gap-10 overflow-x-hidden'>
			{isMobileVersion ? (
				<RenderAllPins pins={pins} />
			) : (
				<>
					<RecentPins pins={pins} />
					<RenderAllPins pins={pins} />
				</>
			)}
		</section>
	)
}
