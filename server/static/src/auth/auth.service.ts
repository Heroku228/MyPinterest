import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { plainToInstance } from 'class-transformer'
import { User } from 'static/src/users/entities/user.entity'
import { UsersService } from 'static/src/users/users.service'
import { AUTH_RESPONSE_ACCESS, AUTH_RESPONSE_MESSAGE, AUTH_RESPONSE_STATUS } from '../consts/enums/AuthEnums'
import { UserTypes } from '../types/user/UserNamespace'
import { ResponseUserDto } from '../users/dto/response-user.dto'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {
	}

	sendErrorObject(reason: AUTH_RESPONSE_MESSAGE) {
		return {
			access: AUTH_RESPONSE_ACCESS.NO_ENTRY_ALLOWED,
			status: AUTH_RESPONSE_STATUS.ERROR,
			message: reason,
		}
	}

	sendSuccessfulResponse(data: UserTypes.IUserResponseDTO) {
		return {
			access: AUTH_RESPONSE_ACCESS.PASS_ALLOWED,
			status: AUTH_RESPONSE_STATUS.OK,
			message: AUTH_RESPONSE_MESSAGE.SUCCESSFUL_AUTHORIZATION,
			userData: data
		}
	}

	async clear() {
		await this.userService.clear()
	}

	async register(user: User) {
		const newUser = await this.userService.save(user)
		const token = this.jwtService.sign({ userId: newUser.id })
		return {
			newUser,
			access_token: token,
		}
	}

	async login(password: string, identifier?: string) {
		if (!identifier) throw new UnauthorizedException('Invalid credentials')

		const user = await this.userService.getUserByUsernameOrEmail(identifier)

		if (!user || !(await compare(password, user.password))) {
			throw new UnauthorizedException('Invalid credentials')
		}

		const responseDto = plainToInstance(ResponseUserDto, user, {
			excludeExtraneousValues: true
		})

		return {
			access_token: this.jwtService.sign({ userId: user.id }),
			user: responseDto
		}
	}

	async validate(userId: string) {
		return await this.userService.getUserById(userId)
	}
}
