import { ClientsModuleOptions, Transport } from '@nestjs/microservices'

export const typeUserMicroservicesConfig: ClientsModuleOptions = [{
	name: 'USERS_MICROSERVICE',
	transport: Transport.TCP,
	options: {
		host: process.env.USER_MICROSERVICE_HOST,
		port: Number(process.env.USER_MICROSERVICE_PORT)
	}
}]
