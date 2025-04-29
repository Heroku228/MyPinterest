import { Input } from '@/components/ui/Input'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { RefObject } from 'react'

export const MobileSearchInput = ({
	showSearch,
	ref,
}: {
	showSearch: boolean
	ref: RefObject<HTMLInputElement | null>
}) => {
	return (
		<>
			{showSearch ? (
				<Input
					additionalStyles='absolute top-15 w-max -right-30'
					placeholder='Search'
					variant={STYLES_VARIANTS.SECONDARY}
					ref={ref}
				/>
			) : null}
		</>
	)
}
