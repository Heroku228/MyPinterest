import { ClientAccountData } from './ClientAccountData'

export default function UserAccount({
	params,
}: {
	params: { params: { username: string } }
}) {

	return <ClientAccountData params={params} />
}
