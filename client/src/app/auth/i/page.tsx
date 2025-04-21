'use client'

import { useAuth } from '@/hooks/context/user/useAuth'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Account } from './Account'

export default function UserAccount() {
	const router = useRouter()
	const { isLoading } = useAuth()

	return <div>{isLoading ? <Loader2Icon /> : <Account />}</div>
}
