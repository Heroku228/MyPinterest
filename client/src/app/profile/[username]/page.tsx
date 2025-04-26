import { ParamsProvider } from '@/hooks/context/paramsContext'
import { INextParams } from '@/types/externalTypes/NextTypes'
import { ClientAccountData } from './ClientAccountData'

export default function UserAccount({ params }: { params: INextParams }) {
	return (
		<ParamsProvider params={params}>
			<ClientAccountData />
		</ParamsProvider>
	)
}
