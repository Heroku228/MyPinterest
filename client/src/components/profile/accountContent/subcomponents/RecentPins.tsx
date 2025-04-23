import { MappedPins } from '@/components/pins/MappedPins'
import { useWindowSize } from '@/hooks/useWindowSize'

export const RecentPins = ({ pins }: { pins: any[] }) => {
	const { width } = useWindowSize()

	return (
		<div className='default-border py-2 px-4 rounded-xl'>
			<h1 className='mb-8 text-xl w-max font-bold italic default-border-bottom'>
				Recents
			</h1>

			<div className='flex justify-center gap-4 flex-wrap mx-auto w-full overflow-hidden'>
				{width > 720 ? (
					<MappedPins pins={pins} start={0} end={10} />
				) : (
					<MappedPins pins={pins} start={0} end={4} />
				)}
			</div>
		</div>
	)
}
