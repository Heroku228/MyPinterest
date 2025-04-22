import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

import { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'
import { homedir } from 'os'
import { join } from 'path'

async function bootstrap() {

	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.setGlobalPrefix('api/v1')

	app.use(bodyParser.json({ limit: '10mb' }))
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
	app.useStaticAssets(join(homedir(), 'Desktop', 'uploads'), {
		prefix: '/avatars'
	})

	await app.listen(process.env.PORT ?? 3000, '0.0.0.0')

	const usersMicroserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.TCP,
		options: {
			host: process.env.USER_MICROSERVICE_HOST,
			port: Number(process.env.USER_MICROSERVICE_PORT)
		}
	})

	await usersMicroserviceApp.listen()
	console.log(`UsersMicroservice is listening on port ${Number(process.env.USER_MICROSERVICE_PORT)}`)
}

bootstrap()
