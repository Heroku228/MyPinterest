'use client'
import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { useWindowSize } from '@/hooks/useWindowSize'
import { Menu, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const HeaderList = ({}) => {
	const router = useRouter()
	const { width } = useWindowSize()

	const handleClick = (path: string) => {
		if (path) router.push(path)
	}

	return (
		<ul
			className={`
			${width < 800 ? '' : 'px-20'}
			flex items-center justify-evenly w-full
		`}
		>
			<LiItem onClick={() => handleClick(ROUTES.HOME)}>Explore</LiItem>

			{width < 1000 ? (
				<Search size={30} />
			) : (
				<LiItem additionalStyles=''>
					<Input
						placeholder='Search'
						variant={STYLES_VARIANTS.PRIMARY}
						ref={null}
					/>
				</LiItem>
			)}

			{width < 1600 ? (
				<div>
					<Menu className='cursor-pointer' size={40} />
				</div>
			) : (
				<>
					<LiItem onClick={() => handleClick(ROUTES.CHAT)}>Chat</LiItem>
					<LiItem onClick={() => handleClick(ROUTES.CREATE_PIN)}>
						Create pin
					</LiItem>
					<LiItem onClick={() => handleClick(ROUTES.API)}>API</LiItem>
				</>
			)}
		</ul>
	)
}
