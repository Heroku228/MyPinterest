import { Body, Controller, Get, Inject, Logger, Param, Post, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { writeFile } from 'fs/promises'
import Redis from 'ioredis'
import { homedir } from 'os'
import { join } from 'path'
import { UserGuard } from 'static/src/common/guards/user.guard'
import { EmailValidationPipe } from 'static/src/conception/pipe'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/currrentuser.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseUserDto } from './dto/response-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseFilters(HttpExceptionFilter)
// @UseInterceptors(UserInterceptor)
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		@Inject('REDIS_CLIENT') private redis: Redis,
	) { }

	private readonly logger = new Logger(UsersController.name)

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		console.log('GET USER BY USERNAME CONTROLLER')
		const user = await this.usersService.getUserByUsername(username)
		this.logger.log(`USER: `,)
		return plainToInstance(ResponseUserDto, user)
	}


	@Post('change-user-icon')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('icon'))
	async changeUserIcon(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: User,
		@Res() res: Response) {
		const filePath = join(homedir(), 'Desktop', 'uploads', user.username, file.originalname)

		user.userIconUrl = file.originalname
		await this.usersService.save(user)
		console.log('USER: ', user)

		await writeFile(filePath, file.buffer)
		return res.status(201).json({ filePath: `http://localhost:3000/api/v1/uploads/avatars/${user.username}/${file.originalname}` })
	}

	@Post('create')
	@UseGuards(UserGuard)
	@UsePipes(EmailValidationPipe, new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async createNewUser(@Body() userDto: CreateUserDto) {
		await this.usersService.findExistingsUser(userDto.email, userDto.username)
		const user = plainToInstance(User, userDto)
		await this.usersService.save(user)
		return plainToInstance(ResponseUserDto, user)
	}


	@Get(':id/status')
	async getStatus(@Param('id') id: string) {
		const isOnline = await this.redis.get(`online:${id}`)
		console.log('Get Status controller (isOnline) :', isOnline)
		return { online: Boolean(isOnline) }
	}

}
