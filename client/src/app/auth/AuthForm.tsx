import { Header } from '@/components/header/Header'
import { useWindowSize } from '@/hooks/useWindowSize'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AuthenticatioSection } from './form/AuthenticationSection'

const SideImage = dynamic(
	() => import('./form/SideImage').then(mod => mod.SideImage),
	{ ssr: false }
)

export const AuthForm = () => {
	const [showRegister, setShowRegister] = useState<boolean>(false)

	const { width } = useWindowSize()

	const getBlock = (isLeft: boolean) => {
		if (showRegister === isLeft) {
			return (
				<SideImage
					className='h-full max-w-xs rounded-md input-r-25'
					imageUrl='/bg/bg-1.jpg'
					show={width > 1150}
				/>
			)
		} else {
			return (
				<AuthenticatioSection
					showRegister={showRegister}
					setShowRegister={setShowRegister}
				/>
			)
		}
	}

	return (
		<div>
			<Header />
			<div className='fixed inset-0 flex items-center justify-center rounded-2xl flex flex-col gap-12 min-h-150 '>
				<main className='flex gap-8 chat-sidebar-background-color '>
					{getBlock(true)}
					{getBlock(false)}
				</main>
			</div>
		</div>
	)
}
