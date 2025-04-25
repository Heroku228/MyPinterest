import { Body, Controller, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { UserGuard } from 'static/src/common/guards/user.guard'
import { EmailValidationPipe } from 'static/src/conception/pipe'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseUserDto } from './dto/response-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseFilters(HttpExceptionFilter)
// @UseInterceptors(UserInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get(':username')
	async getUserByUsername(@Param('username') username: string) {
		const user = await this.usersService.getUserByUsername(username)
		return plainToInstance(ResponseUserDto, user)
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

}
