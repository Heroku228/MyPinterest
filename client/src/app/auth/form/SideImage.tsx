export const SideImage = ({
	imageUrl,
	className,
	show = true,
}: {
	imageUrl: string
	className: string
	show?: boolean
}) => {
	return (
		<>
			{show ? (
				<aside className='min-h-150'>
					<img
						className={className}
						src={imageUrl}
						alt='Auth background image'
					/>
				</aside>
			) : null}
		</>
	)
}
