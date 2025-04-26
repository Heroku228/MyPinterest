import { useRef } from 'react'
import { Input } from '../ui/Input'

export const CreatePin = ({}) => {
	const titleRef = useRef<HTMLInputElement | null>(null)
	const descriptionRef = useRef<HTMLInputElement | null>(null)
	const linkRef = useRef<HTMLInputElement | null>(null)

	const inputStyles = `w-200 border default-border w-max p-2 px-3 rounded-xl `

	return (
		<div className='w-full flex justify-center align-center flex-col gap-20'>
			<h1 className='text-center text-3xl'>Create Pin</h1>

			<section className='mx-auto'>
				<div>PIN IMAGE</div>

				<div className='flex flex-col gap-8'>
					<Input className={inputStyles} ref={titleRef} />
					<Input className={inputStyles} ref={descriptionRef} />
					<Input className={inputStyles} ref={linkRef} />
				</div>

				<div>
					<h1>ADDITIONAL SETTINGS</h1>
				</div>

				<div>
					<button>SHARE</button>
					<button>CREATE</button>
				</div>
			</section>
		</div>
	)
}
