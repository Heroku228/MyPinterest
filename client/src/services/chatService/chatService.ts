import { IMessage } from '@/types/ChatTypes/IChatData'
import { Filter } from 'bad-words'

const filter = new Filter()

export const collectPayload = (message: IMessage) => ({
	text: message.text,
	room: message.room,
	sender: message.sender
})

export const cleanText = (text: string) => {
	return filter.clean(text)
}

export const splitMessageIntoSeveralParts = (message: IMessage) => {
	if (!message) return

	const allMessages: IMessage[] = []
	const splitedMessageText = splitMessageText(message.text)

	if (splitedMessageText.length < 1) return

	splitedMessageText.forEach(item => {
		const chunkedMessage = { ...message, text: item }
		allMessages.push(chunkedMessage)
	})

	return allMessages
}

const splitMessageText = (text: string, maxWordPerChunk: number = 80,
	data?: { words: string[], totalWords: number } | undefined): string[] => {

	const words = data?.words ?? text.trim().split(/\s+/)
	const totalWords = data?.totalWords ?? words.length

	if (totalWords <= maxWordPerChunk)
		return [text.trim()]

	const result: string[] = []

	for (let i = 0; i < totalWords; i += maxWordPerChunk) {
		const chunk = words.slice(i, i + maxWordPerChunk).join(' ')
		result.push(chunk)
	}

	return result
}

export const wordsInText = (text: string): [string[], number] => {
	const words: string[] = text.trim().split(/\s+/)
	const length: number = words.length

	return [words, length]
}

