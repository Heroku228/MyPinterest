import { ROOMS } from '@/constants/enums/Rooms'
import { IMessage } from '@/types/ChatTypes/IChatData'
import { Filter } from 'bad-words'
import { sender } from '../sockets/collectPayloadBody'
import { v4 as uuidv4 } from 'uuid'

const filter = new Filter()

export const collectMessage = (text: string, room?: string) => ({
	messageId: uuidv4(),
	text: text,
	room: room ?? ROOMS[0].name,
	sender: sender,
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
