import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { usePathname, useRouter } from 'next/navigation'

export const HeaderList = ({}) => {
	const router = useRouter()
	const pathName = usePathname()

	const handleClick = (path?: string) => {
		if (path) router.push(path)
	}

	return (
		<ul className='flex items-center justify-evenly px-20 w-full'>
			<LiItem onClick={() => handleClick('/')}>Explore</LiItem>

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
