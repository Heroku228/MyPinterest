'use client'

import { Header } from '@/components/header/Header'
import { AccountContent } from '@/components/profile/accountContent/AccountContent'
import { AccountSidebar } from '@/components/profile/accountSidebar/AccountSidebar'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Account = () => {
	const { isAuthenticated } = useAuth()
	const { width } = useWindowSize()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) router.push('/auth')
	}, [isAuthenticated])

	return (
		<div className='w-11/12 m-auto p-4'>
			<Header />
			<main className={`flex gap-4`}>
				<AccountSidebar isMobileVersion={width < 720 ? true : false} />
				<AccountContent />
			</main>
		</div>
	)
}
