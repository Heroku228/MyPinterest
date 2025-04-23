import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

export const AccountContent = () => {
	const [pins, setPins] = useState<any[]>([])
	const [list, setList] = useState<boolean>(false)

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
		<section className='flex flex-col gap-10 overflow-x-hidden'>
			<div className='default-border py-2 px-4'>
				<h1 className='mb-8 text-xl w-max font-bold italic default-border-bottom'>
					Recents
				</h1>

				<div className='flex gap-4 flex-wrap mx-auto w-full overflow-hidden'>
					{pins.slice(0, 10).map((pin, index) => (
						<div className='relative w-[125px] h-[150px]' key={index}>
							<Image
								key={index}
								className='rounded-lg cursor-pointer default-border transition-all duration-300 hover:scale-105'
								src={pin}
								fill
								alt='pin'
							/>
						</div>
					))}
				</div>
			</div>

			<div className='h-max w-full flex flex-col gap-8 default-border py-2 px-4'>
				<h1 className=' text-xl w-max font-bold italic default-border-bottom'>
					All pins
				</h1>
				<div className='flex justify-between gap-4 default-border w-max px-8 py-1 rounded-md'>
					<span
						onClick={() => setList(true)}
						className='font-bold text-2xl duration-300 transition-color hover:text-purple-900 cursor-pointer'
					>
						List
					</span>
					<span
						onClick={() => setList(false)}
						className='font-bold text-2xl duration-300 transition-color hover:text-purple-900 cursor-pointer'
					>
						Stack
					</span>
				</div>

				<div className='columns-6'>
					{pins.slice(10, 30).map((pin, index) => (
						<div className=' my-4' key={index}>
							<Image
								key={index}
								className='rounded-lg cursor-pointer default-border transition-all duration-300 hover:scale-105 w-full h-auto object-cover rounded-lg'
								src={pin}
								width={100}
								height={100}
								alt='pin'
							/>
						</div>
					))}
				</div>
				<Button
					additionalStyles='w-max m-4 py-2 px-8 text-lg flex mr-auto'
					variant={STYLES_VARIANTS.SECONDARY}
				>
					Show more
				</Button>
			</div>

			<div className='mt-40'></div>
		</section>
	)
}
