import { AuthLogin } from './i/AuthLogin'
import { AuthRegister } from './i/AuthRegister'

export const AuthContent = ({
	registerForm = false,
}: {
	registerForm: boolean
}) => {
	return (
		<div className='flex flex-col gap-2 relative'>
			{registerForm ? <AuthRegister /> : <AuthLogin />}
		</div>
	)
}
