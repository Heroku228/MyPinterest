import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'

export default function NotFound() {
	return (
		<div className='text-white flex flex-col items-center justify-center gap-40'>
			<h1 className='text-3xl italic mt-40'>Page not found...</h1>

			<Button
				variant={STYLES_VARIANTS.SECONDARY}
				additionalStyles='py-2 px-8 text-2xl w-max'
			>
				Go back
			</Button>
		</div>
	)
}
