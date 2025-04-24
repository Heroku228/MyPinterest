'use client'

import { Header } from '@/components/header/Header'
import { useWindowSize } from '@/hooks/useWindowSize'
import { setSocket } from '@/services/socketService/socketService'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
	const [pins, setPins] = useState<any[]>([])
	const { width } = useWindowSize()

	useEffect(() => {
		const fetchAllPins = async () => {
			const response = await axios.get(
				'http://localhost:3000/api/v1/uploads/all-pins'
			)
			console.log('FETCH res : ', response)

			setPins(response.data.images)
		}
		fetchAllPins()
	}, [])

	return (
		<div
			className='min-h-screen overflow-x-hidden'
			style={{ backgroundColor: `rgba(0,0,0,0.9)` }}
		>
			<Header />

			<main className='columns-2 sm:columns-3 md:columns-5 lg:columns-6 xl:columns-7 2xl:columns-8 h-max min-h-screen p-10 w-max mx-auto '>
				{pins.map((pin, index) => (
					<img
						key={index}
						className={`
							rounded-lg cursor-pointer border border-gray-700 transition-all duration-300 hover:scale-105 my-4
							${width < 420 ? 'max-w-[130px]' : 'max-w-[170px]'}
							`}
						src={pin}
						alt='pin'
					/>
				))}
			</main>
			<div></div>
		</div>
	)
}
