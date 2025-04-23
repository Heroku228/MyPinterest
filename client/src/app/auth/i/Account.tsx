import { Header } from '@/components/header/Header'
import { AccountContent } from '@/components/i/AccountContent'
import { AccountSidebar } from '@/components/i/AccountSidebar'
import { useAuth } from '@/hooks/context/user/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Account = () => {
	const { user, logout, isAuthenticated } = useAuth()

	const router = useRouter()
	useEffect(() => {
		console.log('USER : ', user)
		if (!isAuthenticated) router.push('/auth')
	}, [isAuthenticated])

	return (
		<div className='w-11/12 m-auto p-4'>
			<Header />
			<div className='flex gap-4'>
				<AccountSidebar />
				<AccountContent />
			</div>
		</div>
	)
}
