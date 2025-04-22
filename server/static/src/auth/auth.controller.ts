import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { join, resolve } from 'path'
import { ResponseUserDto } from 'static/src/users/dto/response-user.dto'
import { User } from 'static/src/users/entities/user.entity'
import { AUTH_RESPONSE_MESSAGE } from '../consts/enums/AuthEnums'
import { AuthTypes } from '../types/user/AuthNamespace'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async register(@Body() body: any) {
		const { username, email, password, userIconBase64, fileName } = body
		console.log(username, email, password, userIconBase64, fileName)

		const user = plainToInstance(User, {
			username,
			email,
			password,
		})

		if (userIconBase64 && fileName) {
			const base64Data = userIconBase64.replace(/^data:image\/\w+;base64,/, '')
			const buffer = Buffer.from(base64Data, 'base64')

			const folderPath = resolve(homedir(), 'Desktop', 'uploads')
			if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true })

			const safeFileName: string = fileName.slice(0, 20).replace(/[^a-zA-Z0-9.-]/g, '_')
			const extensition = fileName.split('.').pop()?.toLowerCase()
			const filePath = join(safeFileName)

			writeFileSync(`${folderPath}/${filePath}`, buffer)

			user.userIconUrl = `/${fileName}`
		}

		await this.authService.register(user)
		return plainToInstance(ResponseUserDto, user)
	}

	@Post('login')
	async login(@Body() { emailOrUsername, password }: { emailOrUsername: string, password: string }) {
		return await this.authService.login(password, emailOrUsername)
	}

	@Delete('clear')
	async clear() {
		return await this.authService.clear()
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@Req() req): AuthTypes.IAuthResponse {
		if (!req.user)
			return this.authService.sendErrorObject(AUTH_RESPONSE_MESSAGE.NO_USER_DATA_FROM_REQUEST)

		const responseDto = plainToInstance(ResponseUserDto, req.user)
		console.log('CONTROLLER [me] request: ', req.user)
		console.log('RESPONSE DTO: ', responseDto)

		return this.authService.sendSuccessfulResponse(responseDto)
	}
}
