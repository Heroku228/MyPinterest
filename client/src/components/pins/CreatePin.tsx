import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { usePin } from '@/hooks/context/usePin'
import { useWindowSize } from '@/hooks/useWindowSize'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import { ArrowRightCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export const CreatePin = ({}) => {
	const titleRef = useRef<HTMLInputElement | null>(null)
	const descriptionRef = useRef<HTMLInputElement | null>(null)
	const linkRef = useRef<HTMLInputElement | null>(null)
	const uploadRef = useRef<HTMLInputElement | null>(null)

	const { width } = useWindowSize()
	const { setPin } = usePin()

	const handleChange =
		(field: keyof PinTypes.IPin) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value

			setPin(prev => {
				if (!prev)
					return {
						author: {
							id: '',
							username: '',
							createdAt: '',
							email: '',
							userIconUrl: '',
						},
						description: '',
						title: '',
						link: '',
						url: '',
						[field]: value,
					} as PinTypes.IPin

				return {
					...prev,
					[field]: value,
				}
			})
		}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setPin(prev => {
				if (!prev)
					return {
						author: {},
						description: '',
						title: '',
						link: '',
						url: imageUrl,
					} as PinTypes.IPin
				return {
					...prev,
					url: imageUrl,
				}
			})
		}
	}

	const [activeButton, setActiveButton] = useState<number | null>(null)

	const inputStyles = `w-75 lg:w-96 border default-border py-2 px-3 rounded-xl placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all italic text-md lg:text-xl`

	return (
		<div className='chat-sidebar-background-color w-max flex flex-col rounded-2xl items-center gap-8 lg:gap-20 py-4 px-4 lg:px-8 mx-auto'>
			<h1 className='text-center text-2xl lg:text-4xl font-bold text-purple-700'>
				Create Pin
			</h1>

			<section className='rounded-2xl py-2 px-0 flex flex-col items-center gap-10'>
				<label
					htmlFor='file'
					className='default-border mr-auto p-2 px-4 rounded-full text-xl lg:text-2xl italic hover:bg-black cursor-pointer 
				'
				>
					Upload pin
				</label>
				<Input
					onChange={handleFileChange}
					ref={uploadRef}
					type='file'
					id='file'
					name='file'
					className='hidden'
				/>

				<div className='flex flex-col gap-8'>
					<Input
						placeholder='Tell everyone what your Pin is about'
						onChange={handleChange('title')}
						className={twMerge(inputStyles, `${width < 375 ? 'w-65' : ''}`)}
						ref={titleRef}
					/>

					<Input
						onChange={handleChange('description')}
						placeholder='Add a description'
						className={twMerge(inputStyles, `${width < 375 ? 'w-65' : ''}`)}
						ref={descriptionRef}
					/>

					<Input
						placeholder='Link'
						onChange={handleChange('link')}
						className={twMerge(inputStyles, `${width < 375 ? 'w-65' : ''}`)}
						ref={linkRef}
					/>
				</div>

				<div className='ml-auto rounded-full default-border hover:bg-black duration-300 transition-color cursor-pointer'>
					<span className='text-xl lg:text-2xl italic py-2 px-6 rounded-full flex justify-between gap-2 lg:gap-6'>
						Additional
						<ArrowRightCircle className='text-purple-700' size={30} />
					</span>
				</div>

				<div className='flex ml-auto gap-4 m-wax'>
					<Button
						additionalStyles={`
							text-xl hover:scale-110 px-4 rounded-full text-bold italic 
							${activeButton === 1 ? 'scale-105' : ''}`}
						variant={STYLES_VARIANTS.SECONDARY}
						onClick={() => setActiveButton(1)}
					>
						Share
					</Button>

					<Button
						additionalStyles={`
							text-xl hover:scale-110 px-4 rounded-full text-bold italic
							${activeButton === 2 ? 'scale-105' : ''}
							`}
						variant={STYLES_VARIANTS.SECONDARY}
						onClick={() => setActiveButton(2)}
					>
						Create
					</Button>
				</div>
			</section>
		</div>
	)
}
