import { Expose } from 'class-transformer'

export class ResponsePinDto {

	@Expose()
	title: string

	@Expose()
	description: string

	@Expose()
	imageUrl: string

}
