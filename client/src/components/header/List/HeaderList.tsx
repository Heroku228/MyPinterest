import { LiItem } from '@/components/ui/Li'

export const HeaderList = () => {
	return (
		<ul className='flex justify-evenly px-20 w-full'>
			<LiItem>Item #1</LiItem>
			<LiItem>Item #2</LiItem>
			<LiItem>Item #3</LiItem>
			<LiItem>Item #4</LiItem>
			<LiItem>Item #5</LiItem>
			<LiItem>Item #6</LiItem>
		</ul>
	)
}
