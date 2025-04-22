import { TCropTypes } from '@/types/CropTypes'
import { getCroppedImg } from '@/utils/getCroppedImg'
import { useState } from 'react'
import Cropper from 'react-easy-crop'

export const CroppingModal = ({
	image,
	onCancel,
	onCropComplete,
}: TCropTypes) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

	return (
		<div className='fixed left-1/2 z-999 w-100 h-100'>
			<div>
				<Cropper
					crop={crop}
					zoom={zoom}
					aspect={1}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={(_, croppedPixels) =>
						setCroppedAreaPixels(croppedPixels)
					}
					image={image}
				/>
			</div>

			<div>
				<button onClick={onCancel}>Close</button>
				<button
					onClick={async () => {
						const blob: any = await getCroppedImg(image, croppedAreaPixels)
						onCropComplete(blob)
					}}
				>
					Crop
				</button>
			</div>
		</div>
	)
}
