import { Expose } from 'class-transformer'

export class CreatePinDto {
	@Expose()
	title: string
	@Expose()
	description: string
	@Expose()
	url: string
	@Expose()
	username: string
}
