'use client'

import { ErrorLoadingPins } from '@/components/Errors/ErrorLoadingPins'
import { homePagePinsContainerStyles } from '@/constants/styles/pinsStyles'
import { useWindowSize } from '@/hooks/useWindowSize'
import axios from '@/services/axiosInstance'
import { handleDownloadPin } from '@/services/MainService'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
	const [pins, setPins] = useState<PinTypes.IPin[]>([])
	const [isPinsFetched, setIsPinsFetched] = useState<boolean>(false)
	const { width } = useWindowSize()

	useEffect(() => {
		const fetchAllPins = async () => {
			const response = await axios
				.get('pins/all')
				.catch(err => console.error(err))

			if (!response) return
			setPins(response.data)
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
						<div key={index} className='relative'>
							<img
								key={index}
								className={`
							rounded-lg cursor-pointer border border-gray-700 transition-all duration-300 hover:scale-105 my-4
							${width < 420 ? 'max-w-[110px]' : 'max-w-[170px]'}
							`}
								src={pin.url}
								alt='pin'
							/>
							<Download
								onClick={() =>
									handleDownloadPin(pin.url, pin.title || `pin-${index}`)
								}
								className='absolute cursor-pointer duration-300 hover:bg-green-500 hover:text-white p-1 z-999 bottom-2 right-2 bg-white rounded-full'
								size={30}
							/>
						</div>
					))
				) : (
					<ErrorLoadingPins />
				)}
			</main>
		</div>
	)
}
