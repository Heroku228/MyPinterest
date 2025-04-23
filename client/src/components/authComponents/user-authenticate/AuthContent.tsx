import { AuthLogin } from './AuthLogin'
import { AuthRegister } from './register/AuthRegister'

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
