'use client'

import { Header } from '@/components/header/Header'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export default function Home() {
	return (
		<div
			className='min-h-screen'
			style={{ backgroundColor: `rgba(0,0,0,0.9)` }}
		>
			<Header />
			<div className='flex gap-4 justify-center m-50'>
				<Link className='text-3xl' href={'/pins'}>
					Pins
				</Link>
				<Link className='text-3xl' href={'chat'}>
					Chat
				</Link>
				<Link className='text-3xl' href={'account'}>
					Account
				</Link>
			</div>
			<div className='flex flex-col gap-5'>
				<p className='text-center text-3xl'>
					{formatDate(new Date().toDateString())}
				</p>
			</div>
		</div>
	)
}
