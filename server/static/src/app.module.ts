import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { typeOrmConfig } from './config/typeOrmConfig.config'
import { typeUserMicroservicesConfig } from './config/users-microservice.config'
import { UsersMicroserviceModule } from './microservices/users-microservice/users-microservice.module'
import { PinsModule } from './pins/pins.module'
import { UploadsModule } from './uploads/uploads.module'
import { UsersModule } from './users/users.module'
import { WebsocketGateway } from './websocket/websocket.gateway'


@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(typeOrmConfig),
		ClientsModule.register(typeUserMicroservicesConfig),
		UsersModule,
		PinsModule,
		UsersMicroserviceModule,
		AuthModule,
		UploadsModule
	],
	controllers: [AppController],
	providers: [AppService, WebsocketGateway],
})

export class AppModule { }
