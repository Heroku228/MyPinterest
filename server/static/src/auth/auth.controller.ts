import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
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
	async register(@Body() body: any, @Res({ passthrough: true }) response: Response) {
		const { username, email, password, userIconBase64, fileName } = body
		console.log('REGISTER CONTROLLER')

		const userDto = plainToInstance(User, {
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

			userDto.userIconUrl = `${fileName}`
		}

		const { access_token, newUser } = await this.authService.register(userDto)

		response.cookie('token', access_token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return plainToInstance(ResponseUserDto, newUser, {
			excludeExtraneousValues: true
		})
	}

	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('token')
		return { message: 'Logged out' }
	}

	@Post('login')
	async login(@Body() { emailOrUsername, password }: { emailOrUsername: string, password: string }, @Res({ passthrough: true }) res: Response) {

		const { access_token, user } = await this.authService.login(password, emailOrUsername)
		console.log("LOGIN CONTROLLER")

		res.cookie('token', access_token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return user
	}

	@Delete('clear')
	async clear() {
		return await this.authService.clear()
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@Req() req: Request, @Res({ passthrough: true }) res: Response): AuthTypes.IAuthResponse {
		if (!req.user) return this.authService.sendErrorObject(AUTH_RESPONSE_MESSAGE.NO_USER_DATA_FROM_REQUEST)
		const responseDto = plainToInstance(ResponseUserDto, req.user)
		return this.authService.sendSuccessfulResponse(responseDto)
	}
}
