import { usePin } from '@/hooks/context/usePin'
import { useWindowSize } from '@/hooks/useWindowSize'
import { validateLink } from '@/services/MainService'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Span } from '../ui/Span'

export const RenderCreatePin = () => {
	const { pin } = usePin()
	const { width } = useWindowSize()

	const [error, setError] = useState<string | null>(null)
	const [showError, setShowError] = useState<boolean | null>(null)

	useEffect(() => {
		if (!pin || !pin?.link) return

		const { valid, error } = validateLink(pin.link)

		if (!valid && error) {
			setError(error)
			setShowError(true)
			return
		}

		setShowError(false)
		setError(null)
	}, [pin?.link])

	if (!pin) return

	const pStyles = `break-words text-2xl font-bold background-gray py-1 px-8 rounded-md text-purple-300 max-w-md max-h-[200px] overflow-hidden text-lg lg:text-2xl `

	const linkStyles =
		'text-purple-500 max-h-[200px] overflow-hidden word-break-all max-w-md break-words underline hover:text-purple-300 transition-colors italic text-lg lg:text-2xl background-gray py-1 px-8 rounded-md'

	return (
		<div className='text-purple-400 rounded-2xl w-full max-w-3xl mx-auto chat-sidebar-background-color py-4 px-8 h-max overflow-x-hidden'>
			{pin.url && (
				<div className='relative w-full h-90 rounded-xl overflow-hidden mb-6 '>
					<Image
						className='object-contain'
						src={pin.url}
						alt='Pin Image'
						fill
					/>
				</div>
			)}
			<div className='flex flex-col gap-10'>
				{pin.title && (
					<div className='flex-col lg:flex-row flex gap-2 lg:gap-8 items-start lg:items-center h-max mr-auto break-words'>
						<Span className='min-w-max w-10 lg:w-35 font-bold text-xl'>
							Title:
						</Span>
						<p className={pStyles}>{pin.title}</p>
					</div>
				)}
				{pin.description && (
					<div className='flex-col lg:flex-row flex gap-2 lg:gap-8 items-start lg:items-center h-max mr-auto break-words'>
						<Span className='min-w-max w-10 lg:w-35 font-bold text-xl'>
							Description:
						</Span>
						<p className={pStyles}>{pin.description}</p>
					</div>
				)}
				{pin.link && (
					<div>
						<div className='flex-col lg:flex-row flex gap-2 lg:gap-8 items-start lg:items-center h-max mr-auto break-words'>
							<Span className='min-w-max w-10 lg:w-35 font-bold text-xl'>
								Link:
							</Span>
							<Link
								href={pin.link}
								target='_blank'
								rel='noopener noreferrer'
								className={linkStyles}
							>
								{pin.link}
							</Link>
						</div>

						{showError ? (
							<Span additionalStyles='text-red-500 italic text-lg lg:text-xl'>
								{error}
							</Span>
						) : null}
					</div>
				)}
			</div>
		</div>
	)
}
