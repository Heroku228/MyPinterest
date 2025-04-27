'use client'

import { AccountSidebar } from '@/components/profile/accountSidebar/AccountSidebar'
import { Loader } from '@/components/ui/Loader'
import { useWindowSize } from '@/hooks/useWindowSize'
import dynamic from 'next/dynamic'

const AccountContent = dynamic(
	() =>
		import('@/components/profile/accountContent/AccountContent').then(
			mod => mod.AccountContent
		),
	{ loading: () => <Loader /> }
)

export const Account = () => {
	const { width } = useWindowSize()

	return (
		<div className={`flex flex-col md:flex-row gap-4`}>
			{width < 720 ? null : <AccountSidebar />}

			<AccountContent />
		</div>
	)
}
