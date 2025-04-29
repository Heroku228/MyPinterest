import { LiItem } from '@/components/ui/Li'
import { ROUTES } from '@/constants/routes'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MessageCircle, Pin, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const BurgerMenu = ({ showMenu }: { showMenu: boolean }) => {
	const router = useRouter()
	const { width } = useWindowSize()

	const handleClick = (path: string) => {
		if (path) router.push(path)
	}

	const divStyles = 'flex items-center gap-2'
	const liStyles = 'text-lg lg:text-xl'

	return (
		<>
			{showMenu ? (
				<div className='flex flex-col gap-4 burger-menu-bg absolute z-999 p-4 rounded-md top-13 -right-8'>
					<div className={divStyles}>
						<MessageCircle />
						<LiItem
							additionalStyles={liStyles}
							onClick={() => handleClick(ROUTES.CHAT)}
						>
							Chat
						</LiItem>
					</div>
					<div className={divStyles}>
						<Pin />
						<LiItem
							additionalStyles={liStyles}
							onClick={() => handleClick(ROUTES.CREATE_PIN)}
						>
							Create pin
						</LiItem>
					</div>
					<div className={divStyles}>
						<User2Icon />
						<LiItem
							additionalStyles={liStyles}
							onClick={() => handleClick(ROUTES.PROFILE_WITHOUT_USERNAME)}
						>
							Account
						</LiItem>
					</div>
				</div>
			) : null}
		</>
	)
}
