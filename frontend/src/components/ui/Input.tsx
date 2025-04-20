import { loginFormInputStyles } from '@/constants/styles/formInputStyles'
import { InputProps } from '@/types/UI-types/UIComponentsProps'

export const Input: React.FC<InputProps> = ({ ...props }) => {
	return <input className={loginFormInputStyles} type='text' {...props} />
}
