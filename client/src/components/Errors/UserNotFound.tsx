import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { useParamsContext } from '@/hooks/context/paramsContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export const UserNotFound = () => {
	const { paramsUsername } = useParamsContext()
	const router = useRouter()

	return (
		<div className='h-screen w-full flex flex-col gap-20 p-20 items-center'>
			<header className='relative min-w-[600px] amin-h-[400px]'>
				<Image
					src={'/error/oops.jpg'}
					alt='oops image'
					fill
					className='rounded-md'
				/>
			</header>

			<div className='flex flex-col gap-8 items-center'>
				<h1 className='text-center text-3xl'>
					User "<span className='italic text-bold'>{paramsUsername}</span>" not
					found ...
				</h1>

				<Button
					additionalStyles='w-max px-10 m-10 text-2xl'
					variant={STYLES_VARIANTS.SECONDARY}
					onClick={() => router.push(ROUTES.HOME)}
				>
					Go back
				</Button>
			</div>
		</div>
	)
}
