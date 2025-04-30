import { PinTypes } from '@/types/PinTypes/PinTypes.'

export const PinsList = ({ pins }: { pins: PinTypes.IPin[] }) => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-20 overflow-hidden'>
			{pins.map((pin, index) => (
				<div
					className='flex default-border h-max w-max py-1 px-4 rounded-2xl overflow-hidden'
					key={index}
				>
					<img
						className='max-w-32 max-h-32 rounded-2xl'
						src={pin.url}
						alt='pin image'
					/>
					<div className='my-2 mx-4'>
						<h1 className='overflow-y-auto break-words text-md lg:text-lg max-w-72 overflow-hidden max-h-30 border-b border-purple-700 '>
							{pin.title}
						</h1>
						<h2 className='overflow-y-auto break-words text-sm lg:text-md max-w-72 overflow-hidden max-h-30 '>
							{pin.description}
						</h2>
					</div>
				</div>
			))}
		</div>
	)
}
