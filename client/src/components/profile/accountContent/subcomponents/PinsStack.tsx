import { handleDownloadPin } from '@/services/MainService'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { Download } from 'lucide-react'

export const PinsStack = ({ pins }: { pins: PinTypes.IPin[] }) => {
	return pins.map((pin, index) => (
		<div className='my-4 relative rounded-md h-max default-border' key={index}>
			<img
				key={index}
				className='rounded-lg cursor-pointer transition-all duration-300 hover:scale-102 w-full h-auto object-cover rounded-lg max-h-60 max-w-150 hover:brightness-70'
				src={pin.url}
				alt='pin'
			/>
			<Download
				onClick={() => handleDownloadPin(pin.url, pin.title || `pin-${index}`)}
				className='absolute cursor-pointer duration-300 hover:bg-black p-1 z-998 bottom-2 right-2'
				size={30}
			/>
		</div>
	))
}
