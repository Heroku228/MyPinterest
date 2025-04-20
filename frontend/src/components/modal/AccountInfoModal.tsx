import { IUser } from '@/types/IUser/IUser'
import { ModalMenu } from './ModalMenu'
import { UserInfo } from './UserInfo'

export const AccountInfoModal = ({
	username,
	email,
	online,
	language = 'English',
}: Partial<IUser>) => {
	return (
		<div className='absolute right-0 top-12 flex items-center flex-col gap-4 p-3 bg-black rounded-xl w-max text-white'>
			<UserInfo username={username} email={email} online={online} />
			<ModalMenu language={language} />
		</div>
	)
}
