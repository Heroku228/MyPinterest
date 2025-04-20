export type TPayloadBody = {
	room: string,
	sender: IUser,
	text: string,
	messageId: string
}

export interface IUser {
	username: string,
	email: string,
	icon: string | URL | Base64URLString
}
