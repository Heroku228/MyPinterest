import { TReactNode } from '@/types/externalTypes/NextTypes'

export default function Layout({ children }: TReactNode) {
	return <main className='min-h-screen text-white'>{children}</main>
}
