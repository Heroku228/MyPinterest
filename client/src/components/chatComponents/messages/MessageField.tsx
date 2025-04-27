'use client'

import { TextArea } from '@/components/ui/TextArea'
import { messageFieldStyles } from '@/constants/styles/chatStyles'
import { useChatData } from '@/hooks/context/chat/useChatData'
import { useWindowSize } from '@/hooks/useWindowSize'
import { TMessageField } from '@/types/ChatTypes/IChatData'
import { Edit2, Navigation2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const MessageField = ({
	handleChange,
	onSend,
	showError,
	errorMessage,
}: TMessageField & { showError: boolean; errorMessage: string | null }) => {
	const { editing, setEditing, message } = useChatData()

	const { width } = useWindowSize()

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
		if (localText.length === 0) return

		onSend(localText)
		setLocalText('')
		setHeight(65)
	}

	return (
		<div className={`fixed bottom-4 flex justify-center items-center`}>
			{editing ? (
				<div className='flex items-center text-white absolute bottom-28 left-0 w-max border-2 border-purple-900 rounded-xl editing-message-bg-color px-4 py-2 gap-16'>
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
			) : null}

			{showError ? (
				<span className='text-2xl text-white fixed z-999 bottom-52 bg-purple-700 rounded-full py-1 px-3'>
					{errorMessage}
				</span>
			) : null}

			<TextArea
				additionalStyles={messageFieldStyles}
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
			<Navigation2
				className={`
					cursor-pointer hover:bg-indigo-400 text-white rounded-full p-2 absolute  z-999 background-gray active:scale-85 duration-200

				${width < 600 ? 'right-0' : '-right-15 top-1'}
					`}
				onClick={handleSend}
				size={50}
			/>
		</div>
	)
}
