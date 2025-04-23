import { useRouter } from 'next/navigation'
import { CurrentUserInfo } from '../i/CurrentUserInfo'
import { SiteLogo } from '../SiteLogo'
import { HeaderList } from './List/HeaderList'

export const Header = () => {
	const router = useRouter()

	return (
		<header className='grid grid-cols-6 items-center rounded-xl header-bg-color justify-around w-full py-4 px-8 shadow-md mb-10'>
			<div className='col-span-1'>
				<SiteLogo />
			</div>

			<div className='col-span-4'>
				<HeaderList />
			</div>

			<div
				className='transition-bg col-span-1 duration-300 background-gray-hover flex w-full overflow-hidden px-8 rounded-lg'
				onClick={() => window.location.reload()}
			>
				<CurrentUserInfo
					showUsername={true}
					showIcon={true}
					link={''}
					size={40}
				/>
			</div>
		</header>
	)
}
