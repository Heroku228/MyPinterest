export const getCroppedImg = async (imageSrc: string, crop: any) => {
	const image: any = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')


	canvas.width = crop.width
	canvas.height = crop.height

	ctx?.drawImage(
		image,
		crop.x,
		crop.y,
		crop.width,
		crop.height,
		0,
		0,
		crop.width,
		crop.height
	)

	return new Promise(resolve => {
		canvas.toBlob(blob => {
			if (blob) resolve(blob)
		}, 'image/jpeg')
	})

}

const createImage = (url: string) => new Promise((resolve, reject) => {
	const img = new Image()
	img.addEventListener('load', () => resolve(img))
	img.addEventListener('error', error => reject(error))
	img.src = url
})
