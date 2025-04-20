import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { UsersMicroserviceService } from './users-microservice.service'

@Controller()
export class UsersMicroserviceController {
	constructor(private readonly usersMicroserviceService: UsersMicroserviceService) { }

	@EventPattern('message')
	handleMessage(message: string) {
		this.usersMicroserviceService.handleMessage(message)
	}
}
