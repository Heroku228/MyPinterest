import { Injectable } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'


@Injectable()
export class AppService {
	private client: ClientProxy

	constructor() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: process.env.USER_MICROSERVICE_HOST,
				port: Number(process.env.USER_MICROSERVICE_PORT)
			}
		})
	}

	sendMessage() {
		this.client.emit('message', 'user microservice (AppService)')
	}
}
