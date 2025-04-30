import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'

export const AccountSidebarButtons = () => {
	const { logout } = useAuth()
	const router = useRouter()

	const buttonAdditionalStyles = `p-1 text-lg lg:text-xl hover:scale-105`

	return (
		<div className='flex flex-col gap-2'>
			<Button
				variant={STYLES_VARIANTS.SECONDARY}
				onClick={logout}
				additionalStyles={buttonAdditionalStyles}
			>
				Logout
			</Button>
		</div>
	)
}
