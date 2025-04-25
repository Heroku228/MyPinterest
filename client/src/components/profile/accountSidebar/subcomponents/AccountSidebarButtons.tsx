import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { accountSidebarButtonMobileStyles } from '@/constants/styles/accountSidebarStyles'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'

export const AccountSidebarButtons = ({
	isMobileVersion,
}: {
	isMobileVersion: boolean
}) => {
	const { logout } = useAuth()
	const router = useRouter()

	return (
		<div className='flex flex-col lg:flex-row gap-2'>
			<Button
				variant={STYLES_VARIANTS.SECONDARY}
				onClick={logout}
				additionalStyles={`${
					isMobileVersion ? accountSidebarButtonMobileStyles : ''
				}`}
			>
				Logout
			</Button>
			<Button
				additionalStyles={`${
					isMobileVersion ? accountSidebarButtonMobileStyles : ''
				}`}
				variant={STYLES_VARIANTS.SECONDARY}
				onClick={() => router.push(ROUTES.SETTINGS)}
			>
				Edit profile
			</Button>
		</div>
	)
}
