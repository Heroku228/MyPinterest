'use client'

import { ErrorLoadingPins } from '@/components/Errors/ErrorLoadingPins'
import { homePagePinsContainerStyles } from '@/constants/styles/pinsStyles'
import { useWindowSize } from '@/hooks/useWindowSize'
import axios from '@/services/axiosInstance'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
	const [pins, setPins] = useState<any[]>([])
	const [isPinsFetched, setIsPinsFetched] = useState<boolean>(false)
	const { width } = useWindowSize()

	useEffect(() => {
		const fetchAllPins = async () => {
			const response = await axios.get('/uploads/all-pins')

			if (response.status !== 200) setIsPinsFetched(false)
			else {
				setIsPinsFetched(true)
				setPins(response.data.images)
			}
		}
		fetchAllPins()
	}, [])

	return (
		<div className='min-h-screen overflow-x-hidden'>
			<main
				className={twMerge(`${homePagePinsContainerStyles(isPinsFetched)}`)}
			>
				{!isPinsFetched ? (
					pins.map((pin, index) => (
						<img
							key={index}
							className={`
							rounded-lg cursor-pointer border border-gray-700 transition-all duration-300 hover:scale-105 my-4
							${width < 420 ? 'max-w-[130px]' : 'max-w-[170px]'}
							`}
							src={pin}
							alt='pin'
						/>
					))
				) : (
					<ErrorLoadingPins />
				)}
			</main>
		</div>
	)
}
