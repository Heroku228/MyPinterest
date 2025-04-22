export type TCropTypes = {
	image: string,
	onCancel: () => void
	onCropComplete: (croppedBlob: Blob) => void
}
