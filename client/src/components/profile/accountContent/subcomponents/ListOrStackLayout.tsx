import { Span } from '@/components/ui/Span'
import { SetStateAction } from 'react'

export const ListOrStackLayout = ({
	setList,
}: {
	setList: React.Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<div className='flex justify-between gap-4 default-border w-max px-8 py-1 rounded-md'>
			<Span onClick={() => setList(true)}>List</Span>
			<Span onClick={() => setList(false)}>Stack</Span>
		</div>
	)
}
