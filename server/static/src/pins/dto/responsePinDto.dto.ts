import { Expose } from 'class-transformer'

export class ResponsePinDto {

	@Expose()
	title: string

	@Expose()
	description: string

	@Expose()
	imageUrl: string

	@Expose()
	isCensor?: boolean
	@Expose()
	isBanned?: boolean
	@Expose()
	isPopular?: boolean
	@Expose()
	isHidden?: boolean
}
