import { TReactNode } from '@/types/externalTypes/NextTypes'

export default function Layout({ children }: TReactNode) {
	return (
		<main
			className='min-h-screen text-white'
			style={{ backgroundColor: `rgba(0,0,0,0.9)` }}
		>
			{children}
		</main>
	)
}
