import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const HeaderList = ({}) => {
	const router = useRouter()
	const pathName = usePathname()

	const [active, setActive] = useState<boolean | null>(null)

	const handleClick = (path?: string) => {
		if (path === pathName) {
		}

		if (path) router.push(path)
	}

	const activeStyles = `text-purple-900 bg-red-500`

	return (
		<ul className='flex items-center justify-evenly px-20 w-full'>
			<LiItem onClick={() => handleClick('/')}>Home</LiItem>

			<LiItem onClick={() => handleClick('/ideas')}>Explore</LiItem>

			<LiItem additionalStyles=''>
				<Input
					placeholder='Search'
					variant={STYLES_VARIANTS.PRIMARY}
					ref={null}
				/>
			</LiItem>

			<LiItem onClick={() => handleClick('/chat')}>Chat</LiItem>
			<LiItem onClick={() => handleClick('/api')}>API</LiItem>
		</ul>
	)
}
