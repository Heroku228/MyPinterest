import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersMicroserviceService {
	handleMessage(message: string) {
		console.log('UsersMicroservice 1234: ', message)
	}
}
