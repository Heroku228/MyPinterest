import {
	blockIconStyles,
	blockStyles,
} from '@/constants/styles/accountModalStyles'
import {
	ArrowRightSquareIcon,
	HelpCircle,
	Languages,
	LogOut,
	LucideSettings,
} from 'lucide-react'

export const ModalMenu = ({ language }: { language: string }) => {
	return (
		<>
			<div className={blockStyles}>
				<Languages />
				<span>Language: {language}</span>
				<ArrowRightSquareIcon className={blockIconStyles} />
			</div>

			<div className={blockStyles}>
				<LucideSettings />
				<span>Settings</span>
				<ArrowRightSquareIcon className={blockIconStyles} />
			</div>

			<div className={blockStyles}>
				<HelpCircle />
				<span>Help</span>
				<ArrowRightSquareIcon className={blockIconStyles} />
			</div>

			<div className={blockStyles}>
				<LogOut width={'20px'} height={'20px'} className='text-white' />
				<span className=''>Sign out</span>
			</div>
		</>
	)
}
