import { Exclude, Expose } from 'class-transformer'

export class ResponseUserDto {
	@Exclude()
	id: string
	
	@Exclude()
	password: string

	@Expose()
	username: string

	@Expose()
	email: string

	// @Expose()
	// userIconUrl: string

	@Expose()
	createadAt: Date

	@Expose()
	updatedAt: Date

	@Expose()
	isBanned: boolean

	@Expose()
	isBlocked: boolean

	@Expose()
	isStatusExpired: boolean
}
