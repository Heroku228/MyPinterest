import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserMiddleWare } from 'static/src/middleware/user.middleware'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService],
})

export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserMiddleWare).forRoutes('users')
	}
}
