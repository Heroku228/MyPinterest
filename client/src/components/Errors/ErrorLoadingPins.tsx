import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { Button } from '../ui/Button'

export const ErrorLoadingPins = () => {
	return (
		<div className='flex flex-col justify-center w-full items-center my-40 gap-20'>
			<h1 className='text-3xl text-white'>Connection error ...</h1>
			<Button
				onClick={() => window.location.reload}
				variant={STYLES_VARIANTS.SECONDARY}
				additionalStyles='mx-auto w-max px-15 text-3xl'
			>
				Reload
			</Button>
		</div>
	)
}
