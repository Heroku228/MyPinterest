import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@Expose()
	@IsNotEmpty({ message: 'Username cannot be empty' })
	@Length(4, 16, { message: 'The username cannot be more than 16 characters and less than 4 characters' })
	@IsString({ message: 'Username should be a line' })
	username: string

	@Length(6, 24, { message: 'The password cannot be more than 24 characters and less than 6 characters' })
	@Expose()
	@IsString({ message: 'password should be a line' })
	password: string

	@Expose()
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email is required' })
	@IsString({ message: 'email should be a line' })
	email: string

	// @Expose()
	// @IsString({ message: 'email should be a line' })
	// userIconUrl: string
}
