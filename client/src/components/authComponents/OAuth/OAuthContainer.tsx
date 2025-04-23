import Image from 'next/image'
import { OAuthBlock } from './OAuthBlock'

export const OAuthContainer = () => {
	return (
		<div className='mt-auto '>
			<div className='w-full flex justify-center mb-2'>
				<span className='text-xs text-gray-200 italic'>Or continue with</span>
			</div>

			<hr className='text-opacity-50 mb-4' />

			<div className='border chat-sidebar-border oAuthBlock-bg-color p-2 rounded-xl flex justify-evenly'>
				<OAuthBlock
					children={
						<Image
							src={'/google1.svg'}
							alt='Google icon'
							height={45}
							width={45}
						/>
					}
				/>
				<OAuthBlock
					children={
						<Image
							src={'/apple1.svg'}
							alt='Google icon'
							height={45}
							width={45}
						/>
					}
				/>
			</div>
		</div>
	)
}
