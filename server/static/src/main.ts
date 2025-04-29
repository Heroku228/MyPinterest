import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

import { NestExpressApplication } from '@nestjs/platform-express'
import { json, urlencoded } from 'body-parser'
import * as cookiesParser from 'cookie-parser'

async function bootstrap() {

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: {
			origin: [
				'http://localhost:3001',
				'http://localhost:3000',
				'http://192.168.0.188:3001',
				'http://192.168.0.193:3001',
			],
			credentials: true
		}
	})

	app.setGlobalPrefix('api/v1')

	app.use(cookiesParser())
	app.use(json({ limit: '10mb' }))
	app.use(urlencoded({ limit: '10mb', extended: true }))

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
