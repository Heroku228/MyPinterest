import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'static/src/users/entities/user.entity'
import { UsersService } from 'static/src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '1h' }
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UsersService]
})
export class AuthModule { }
