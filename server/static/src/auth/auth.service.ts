import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { plainToInstance } from 'class-transformer'
import { User } from 'static/src/users/entities/user.entity'
import { UsersService } from 'static/src/users/users.service'
import { ResponseUserDto } from '../users/dto/response-user.dto'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {
	}

	async clear() {
		await this.userService.clear()
	}

	async register(user: User) {
		await this.userService.save(user)
	}

	async login(password: string, identifier?: string) {
		console.log('AUTHSERVICE [login] (email, username): ', identifier)

		if (!identifier) throw new UnauthorizedException('Invalid credentials')

		const user = await this.userService.getUserByUsernameOrEmail(identifier)

		console.log("USER: ", user)
		console.log('AUTHSERVICE [login] (username): ', identifier)
		console.log("USER PASSWORD: ", user?.password)
		console.log('PASSWORD: ', password)

		if (user)
			console.log('COMPARE: ', await compare(password, user.password))

		if (!user || !(await compare(password, user.password))) {
			throw new UnauthorizedException('Invalid credentials')
		}

		const responseDto = plainToInstance(ResponseUserDto, user)


		return {
			access_token: this.jwtService.sign({ userId: user.id }),
			user: responseDto
		}
	}

	async validate(userId: string) {
		return await this.userService.getUserById(userId)
	}
}
