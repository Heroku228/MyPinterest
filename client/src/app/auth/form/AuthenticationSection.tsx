import { AuthContent } from '@/components/authComponents/AuthContent'
import { SiteLogo } from '@/components/SiteLogo'
import { Hint } from '@/components/ui/Hint'
import { OAuthContainer } from '@/components/ui/OAuthContainer'
import { SetStateAction } from 'react'

export const AuthenticatioSection = ({
	showRegister,
	setShowRegister,
}: {
	showRegister: boolean
	setShowRegister: React.Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<section className='flex flex-col gap-4 w-full shadow-lg py-4 px-8'>
			<header className='flex flex-col gap-4 items-center'>
				<SiteLogo />
				<h1 className='text-2xl font-bold italic'>
					{showRegister ? 'Sign up to continue' : 'Sign in to continue'}
				</h1>
			</header>

			<hr className='text-opacity-50 ' />

			<AuthContent registerForm={showRegister} />

			<footer className='relative italic'>
				<Hint
					message={showRegister ? 'Have an account?' : "Don't have an account?"}
					link={showRegister ? 'Sign in' : 'Sign up'}
					hint={{ showHint: showRegister, setShowHint: setShowRegister }}
				/>
			</footer>

			<OAuthContainer />
		</section>
	)
}
