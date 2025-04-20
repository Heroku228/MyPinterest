import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto } from 'static/src/users/dto/create-user.dto'
import { ResponseUserDto } from 'static/src/users/dto/response-user.dto'
import { User } from 'static/src/users/entities/user.entity'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		const user = plainToInstance(User, createUserDto)
		await this.authService.register(user)
		return plainToInstance(ResponseUserDto, user)
	}

	@Post('login')
	async login(@Body() { username, password }: { username: string, password: string }) {
		return await this.authService.login(password, username)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@Req() req) {
		console.log('CONTROLLER [me] request: ', req.user)
		return req.user
	}
}
