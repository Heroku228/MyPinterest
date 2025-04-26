'use client'
import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'

export const HeaderList = ({}) => {
	const router = useRouter()

	const { isAuthenticated } = useAuth()

	const handleClick = (path: string) => {
		if (path) router.push(path)
	}

	return (
		<ul className='flex items-center justify-evenly px-20 w-full'>
			<LiItem onClick={() => handleClick(ROUTES.HOME)}>Explore</LiItem>

			<LiItem additionalStyles=''>
				<Input
					placeholder='Search'
					variant={STYLES_VARIANTS.PRIMARY}
					ref={null}
				/>
			</LiItem>

			<LiItem onClick={() => handleClick(ROUTES.CHAT)}>Chat</LiItem>
			<LiItem onClick={() => handleClick(ROUTES.CREATE_PIN)}>Create pin</LiItem>
			<LiItem onClick={() => handleClick(ROUTES.API)}>API</LiItem>
		</ul>
	)
}
