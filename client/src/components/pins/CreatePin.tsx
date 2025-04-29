import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { PINS_ENDPOINTS } from '@/constants/enums/endpoints'
import { emptyPin } from '@/constants/response/Response'
import { usePin } from '@/hooks/context/usePin'
import { useWindowSize } from '@/hooks/useWindowSize'
import { PinTypes } from '@/types/PinTypes/PinTypes.'
import axios from 'axios'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Span } from '../ui/Span'

type TResponseMessage = {
	httpStatus: number
	data: {
		status: string
		message: string
	}
}

export const CreatePin = () => {
	const { width } = useWindowSize()
	const { setPin } = usePin()
	const [responseMessage, setResponseMessage] =
		useState<TResponseMessage | null>(null)

	const uploadRef = useRef<HTMLInputElement | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const description = formData.get('description')
		const title = formData.get('title')

		if (!description || !title || !uploadRef.current?.value) {
			setResponseMessage({
				httpStatus: 400,
				data: {
					message: 'Please fill all fields',
					status: 'error',
				},
			})

			setTimeout(() => setResponseMessage(null), 2000)

			return
		}

		const response = await axios.post(PINS_ENDPOINTS.CREATE_PIN, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
		})

		setTimeout(() => {
			setResponseMessage(null)
		}, 2000)

		setResponseMessage({
			httpStatus: response.status,
			data: {
				message: response.data.message,
				status: response.data.status,
			},
		})

		if (uploadRef.current) {
			uploadRef.current.value = ''
		}
		setPin(null)
	}

	const handleChange =
		(field: keyof PinTypes.IPin) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value

			setPin(prev => {
				if (!prev) return emptyPin(field, value)

				return {
					...prev,
					[field]: value,
				}
			})
		}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) return

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

	const inputStyles = `w-75 lg:w-96 border default-border py-2 px-3 rounded-xl placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all italic text-md lg:text-xl`

	return (
		<div className='chat-sidebar-background-color w-max flex flex-col rounded-2xl items-center gap-8 lg:gap-20 py-4 px-4 lg:px-8 mx-auto'>
			<h1 className='text-center text-2xl lg:text-4xl font-bold text-purple-700'>
				Create Pin
			</h1>

			<section className='rounded-2xl py-2 px-0 flex flex-col items-center gap-10'>
				<form
					onSubmit={handleSubmit}
					id='create-pin-form'
					className='flex flex-col  gap-8'
				>
					<label
						htmlFor='file'
						className='default-border mr-auto p-2 px-4 rounded-full text-xl lg:text-2xl italic hover:bg-black cursor-pointer'
					>
						Upload pin
					</label>
					<Input
						ref={uploadRef}
						onChange={handleFileChange}
						type='file'
						id='file'
						name='file'
						className='hidden'
					/>

					<div className='flex flex-col gap-8'>
						<Input
							name='title'
							placeholder='Tell everyone what your Pin is about'
							onChange={handleChange('title')}
							className={twMerge(inputStyles, `${width < 375 ? 'w-65' : ''}`)}
						/>

						<Input
							name='description'
							onChange={handleChange('description')}
							placeholder='Add a description'
							className={twMerge(inputStyles, `${width < 375 ? 'w-65' : ''}`)}
						/>
					</div>
				</form>

				{responseMessage ? (
					<Span
						className={`transition-all duration-300 text-bold italic w-max mx-8 text-xl lg:text-xl
					${responseMessage.httpStatus !== 201 ? 'text-red-600' : 'text-green-600'}	`}
					>
						{responseMessage.data.message}
					</Span>
				) : null}

				<div className='flex ml-auto gap-4 m-wax'>
					<Button
						form='create-pin-form'
						additionalStyles={`text-xl hover:scale-110 px-4 rounded-full text-bold italic`}
						variant={STYLES_VARIANTS.SECONDARY}
					>
						Create
					</Button>
				</div>
			</section>
		</div>
	)
}
