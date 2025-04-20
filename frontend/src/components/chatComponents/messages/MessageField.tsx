import { messageFieldStyles } from '@/constants/styles/messageFieldStyles'
import { useChatData } from '@/hooks/context/chat/useChatData'
import { TMessageField } from '@/types/ChatTypes/IChatData'
import { Edit2, Navigation2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../../ui/Button'
import { TextArea } from '../../ui/TextArea'

export const MessageField = ({ handleChange, onSend }: TMessageField) => {
	const { editing, setEditing, message } = useChatData()

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [height, setHeight] = useState<number>(65)
	const [localText, setLocalText] = useState<string>('')

	useEffect(() => {
		if (editing && message) setLocalText(message.text)
		else setLocalText('')

		textareaRef.current?.focus()
	}, [message, editing])

	const adjustHeight = () => {
		if (!textareaRef.current) return
		if (!textareaRef.current?.value) setHeight(65)

		const clientHeight = textareaRef.current.clientHeight
		const scrollHeight = textareaRef.current.scrollHeight

		if (scrollHeight > clientHeight) setHeight(150)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = e.target.value
		setLocalText(newText)
		handleChange(e, editing)
		adjustHeight()
	}

	const handleSend = () => {
		onSend(localText)
		setLocalText('')
		setHeight(65)
	}

	return (
		<div className='rounded-xl w-max relative bottom-2 right-1/3 z-999'>
			{editing ? (
				<div className='flex items-center text-white fixed bottom-30 left-80 w-max border-2 border-purple-900 rounded-xl editing-message-bg-color px-4 py-2 gap-16'>
					<div className='flex items-center gap-4'>
						<Edit2 size={20} />
						<span>Editing message</span>
					</div>
					<X
						className='cursor-pointer'
						onClick={() => setEditing(false)}
						size={20}
					/>
				</div>
			) : (
				''
			)}
			<TextArea
				className={messageFieldStyles}
				placeholder='Ask anything'
				value={localText}
				style={{
					height: `${height + 30}px`,
					backgroundColor: 'rgba(16, 16, 16, 1)',
				}}
				onChange={handleInputChange}
				onKeyUp={e => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						handleSend()
						setHeight(65)
					}
				}}
				onKeyDown={e => {
					if (e.key === 'Enter' && !e.shiftKey) e.preventDefault()
				}}
				ref={textareaRef}
			/>

			<Button
				additionalStyles='fixed bottom-10 left-238 bg-purple-400 z-999'
				onClick={handleSend}
			>
				<Navigation2 size={20} />
			</Button>
		</div>
	)
}
