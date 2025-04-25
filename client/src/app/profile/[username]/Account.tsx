'use client'

import { Header } from '@/components/header/Header'
import { AccountContent } from '@/components/profile/accountContent/AccountContent'
import { AccountSidebar } from '@/components/profile/accountSidebar/AccountSidebar'
import { useWindowSize } from '@/hooks/useWindowSize'

export const Account = () => {
	const { width } = useWindowSize()

	return (
		<div className='w-11/12 m-auto p-4'>
			<Header />
			<main className={`flex flex-col md:flex-row gap-4`}>
				<AccountSidebar isMobileVersion={width < 960 ? true : false} />
				<AccountContent isMobileVersion={width < 960 ? true : false} />
			</main>
		</div>
	)
}
