import Image from 'next/image'

export const MappedPins = ({
	pins,
	start,
	end,
}: {
	pins: any[]
	start: number
	end: number
}) => {
	return (
		<>
			{pins.slice(start, end).map((pin, index) => (
				<div className='relative w-[125px] h-[150px]' key={index}>
					<Image
						key={index}
						className='rounded-lg cursor-pointer default-border transition-all duration-300 hover:scale-105'
						src={pin}
						fill
						sizes='125'
						alt='pin'
					/>
				</div>
			))}
		</>
	)
}
