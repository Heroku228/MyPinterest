import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { UserGuard } from 'static/src/common/guards/user.guard'
import { UserInterceptor } from 'static/src/common/interceptors/user.interceptor'
import { EmailValidationPipe } from 'static/src/conception/pipe'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseUserDto } from './dto/response-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(UserInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		console.log('CONTROLLER [getUserByUsername]: ', username)
		const user = await this.usersService.getUserByUsername(username)
		return plainToInstance(ResponseUserDto, user)
	}

	@Post('create')
	@UseGuards(UserGuard)
	@UsePipes(EmailValidationPipe, new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	// Interceptors - action before request and after request
	async createNewUser(@Body() userDto: CreateUserDto) {
		console.log('CONTROLLER [createNewUser]: ', userDto)
		console.log('CONTROLLER [createNewUser] (username): ', userDto.username)
		await this.usersService.findExistingsUser(userDto.email, userDto.username)
		const user = plainToInstance(User, userDto)
		await this.usersService.save(user)
		return plainToInstance(ResponseUserDto, user)
	}

	@Patch('update')
	async patchUserData(@Query('id') id: string, @Query() updateData: Record<string, any>) {
		console.log('Controller [patchUserData] (id): ', id)
		console.log('Controller [patchUserData] (updateData): ', updateData)
	}
}
