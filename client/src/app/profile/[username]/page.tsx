import { RedirectInterLayer } from '@/components/RedirectInterlayer'
import { ParamsProvider } from '@/hooks/context/paramsContext'
import { useAuth } from '@/hooks/context/user/useAuth'
import { INextParams } from '@/types/externalTypes/NextTypes'
import { ClientAccountData } from './ClientAccountData'

export default function UserAccount({ params }: { params: INextParams }) {
	const { user } = useAuth()

	return (
		<ParamsProvider params={params}>
			<RedirectInterLayer redirect={'/profile'}>
				<ClientAccountData />
			</RedirectInterLayer>
		</ParamsProvider>
	)
}
