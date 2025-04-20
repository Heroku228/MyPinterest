import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { User } from 'static/src/users/entities/user.entity'
import { UsersService } from 'static/src/users/users.service'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {
	}

	async register(user: User) {
		this.userService.save(user)
	}

	async login(password: string, username?: string, email?: string) {
		console.log('AUTHSERVICE [login] (email, username): ', email, username)

		if (!username && !email) throw new UnauthorizedException('Invalid credentials')

		let user: User = new User()

		if (username) user = await this.userService.getUserByUsername(username)
		else if (email) user = await this.userService.getUserByEmail(email)

		console.log('AUTHSERVICE [login] (username): ', username)

		if (!user || !(await compare(password, user.password)))
			throw new UnauthorizedException('Invalid credentials')

		return { access_token: this.jwtService.sign({ userId: user.id }) }
	}

	async validate(userId: string) {
		return await this.userService.getUserById(userId)
	}
}
