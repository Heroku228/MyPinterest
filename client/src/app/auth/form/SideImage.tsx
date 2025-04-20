export const SideImage = ({
	imageUrl,
	className,
}: {
	imageUrl: string
	className: string
}) => {
	return (
		<aside className='min-h-150'>
			<img className={className} src={imageUrl} alt='Auth background image' />
		</aside>
	)
}
