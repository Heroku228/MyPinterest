import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/context/user/useAuth'
import { UserTypes } from '@/types/UserTypes'
import { RenderUserData } from '../../RenderUserData'
import { AccountSidebarButtons } from './AccountSidebarButtons'

export const AccountSidebarWrapper = ({
	anotherUser,
	isMobileVersion,
}: {
	anotherUser: UserTypes.TResponseUserDto | null | undefined
	isMobileVersion: boolean
}) => {
	const { user } = useAuth()

	return (
		<div>
			<RenderUserData
				showUsername
				showEmail
				showIcon
				link={anotherUser ? '' : ROUTES.SETTINGS}
				size={160}
				additionalStyles='flex-col'
				description='Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World'
				userData={anotherUser ? anotherUser : user}
				imageStyles={'rounded-xl duration-300 transition-all hover:scale-105'}
			/>

			{anotherUser ? null : (
				<AccountSidebarButtons isMobileVersion={isMobileVersion} />
			)}
		</div>
	)
}
