import { TReactNode } from '@/types/externalTypes/NextTypes'

export default function Layout({ children }: TReactNode) {
	return <main className='text-white'>{children}</main>
}
