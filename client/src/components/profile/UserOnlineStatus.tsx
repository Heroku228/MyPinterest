import { CircleCheckBigIcon, CircleMinus } from 'lucide-react'

export const UserOnlineStatus = ({
	showOnlineStatus,
}: {
	showOnlineStatus: boolean
}) => {
	return (
		<div className='flex items-center gap-3'>
			{showOnlineStatus ? (
				<CircleCheckBigIcon className='text-green-400' />
			) : (
				<CircleMinus className='text-red-500' />
			)}
		</div>
	)
}
