import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const HeaderList = () => {
	const [active, setActive] = useState<boolean>(false)
	const router = useRouter()

	return (
		<ul className='flex items-center justify-evenly px-20 w-full'>
			<LiItem onClick={() => router.push('/')}>Home</LiItem>
			
			<LiItem>
				<Input variant={STYLES_VARIANTS.PRIMARY} ref={null} />
			</LiItem>

			<LiItem onClick={() => router.push('/chat')}>Chat</LiItem>
			<LiItem onClick={() => router.push('/api')}>API</LiItem>
		</ul>
	)
}
