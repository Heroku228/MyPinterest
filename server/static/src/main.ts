import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { readFileSync } from 'fs'
import { AppModule } from './app.module'

async function bootstrap() {
	const httpsOptions = {
		key: readFileSync('../ssl/key.pem'),
		cert: readFileSync('../ssl/cert.pem')
	}

	const app = await NestFactory.create(AppModule, { httpsOptions })
	app.setGlobalPrefix('api/v1')
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
