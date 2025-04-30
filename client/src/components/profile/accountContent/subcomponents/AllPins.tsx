'use client'

import { Button } from '@/components/ui/Button'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { useAuth } from '@/hooks/context/user/useAuth'
import axios from '@/services/axiosInstance'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PinsStack } from './PinsStack'

export const RenderAllPins: React.FC = () => {
	const [list, setList] = useState<boolean>(false)
	const [pins, setPins] = useState<PinTypes.IPin[]>([])

	const { isAuthenticated, user } = useAuth()

	const params = usePathname()
	const usernameFromParams = params.replace('/profile/', '')

	useEffect(() => {
		if (isAuthenticated && user?.username === usernameFromParams) {
			const getAllUserPins = async () => {
				const response = await axios
					.get<PinTypes.IPin[]>('pins/get-all-user-pins')
					.catch(err => console.error(err))

				if (response && response.data) setPins(response.data)
			}
			getAllUserPins()
			return
		}

		const getAllPinsByUsername = async () => {
			console.log('PARAMS', usernameFromParams)
			const response = await axios
				.get<PinTypes.IPin[]>(`pins/get-pins-by-username/${usernameFromParams}`)
				.catch(err => console.error(err))

			if (!response) return
			console.log(response)
			if (response.data) setPins(response.data)
		}

		getAllPinsByUsername()
		return
	}, [])

	const stackStyles =
		'columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6'

	return (
		<div className='h-max w-full flex gap-8 flex-col  py-2 px-4'>
			<div className={stackStyles}>
				<PinsStack pins={pins} />
			</div>
			<Button
				additionalStyles='w-max m-4 py-2 px-8 text-lg flex mr-auto'
				variant={STYLES_VARIANTS.SECONDARY}
			>
				Show more
			</Button>
		</div>
	)
}
