'use client'
import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import Image from 'next/image'
import { useState } from 'react'

export const RenderAllPins = ({ pins }: { pins: any[] }) => {
	const [list, setList] = useState<boolean>(false)

	return (
		<div className='h-max w-full flex flex-col gap-8 default-border rounded-xl py-2 px-4'>
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
	)
}
