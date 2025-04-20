import { IMessage } from '@/types/ChatTypes/IChatData'
import { IUser } from '@/types/IUser/IUser'

export const collectPayload = (message: IMessage) => ({
	text: message.text,
	room: message.room,
	sender: message.sender
})


export const sender: IUser = {
	username: 'Killerqueen',
	email: 'queen@yandex.com',
	icon: '/logo.jpeg',
	online: true,
	language: 'English'
}
