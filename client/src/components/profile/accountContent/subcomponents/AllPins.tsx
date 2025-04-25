'use client'
import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useState } from 'react'
import { ListOrStackLayout } from './ListOrStackLayout'

export const RenderAllPins = ({ pins }: { pins: string[] }) => {
	const [list, setList] = useState<boolean>(false)

	const { width } = useWindowSize()

	return (
		<div className='h-max w-full flex flex-col gap-8 default-border rounded-xl py-2 px-4'>
			{width < 800 ? null : <ListOrStackLayout setList={setList} />}

			<div className='columns-3 md:columns-4 lg:columns-6 xl:columns-8 2xl:columns-10'>
				{pins.slice(10, 30).map((pin, index) => (
					<div className='my-4' key={index}>
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
