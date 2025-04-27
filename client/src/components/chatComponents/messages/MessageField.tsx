'use client'

import { TextArea } from '@/components/ui/TextArea'
import { messageFieldStyles } from '@/constants/styles/chatStyles'
import { useChatData } from '@/hooks/context/chat/useChatData'
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

		if (newText.length === 0) setEditing(false)

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
		<div className='fixed left-2/5 bottom-0 flex mx-auto justify-center items-center'>
			{editing ? (
				<div className='flex items-center text-white fixed bottom-28 left-110 w-max border-2 border-purple-900 rounded-xl editing-message-bg-color px-4 py-2 gap-16'>
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
				<span className='text-2xl text-white fixed z-999 bottom-48 left-1/3 bg-red-600 rounded-md py-2 px-5 font-bold'>
					{errorMessage}
				</span>
			) : null}

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
			<Navigation2
				className='cursor-pointer bg-indigo-400 text-white rounded-full p-2 absolute left-90 z-999'
				onClick={handleSend}
				size={50}
			/>
		</div>
	)
}
