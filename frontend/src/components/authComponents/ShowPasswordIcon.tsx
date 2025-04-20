import { Eye, EyeClosed } from 'lucide-react'
import { SetStateAction } from 'react'

export const ShowPasswordIcon = ({
	showPassword,
	setShowPassword,
}: {
	showPassword: boolean
	setShowPassword: React.Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<span
			className='absolute right-3 cursor-pointer'
			onClick={() => setShowPassword(!showPassword)}
		>
			{showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
		</span>
	)
}
