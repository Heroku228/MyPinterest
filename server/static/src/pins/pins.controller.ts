import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common'
import { PinField, PinTitle } from 'static/src/common/decorators/pin.decorator'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { Pin } from './entities/pin.entity'
import { PinsService } from './pins.service'

@Controller('pins')
@UseFilters(HttpExceptionFilter)
export class PinsController {
	constructor(private readonly pinsService: PinsService) { }

	@Get('all')
	async getAllPins() {
		console.log('CONTROLLER [getAllPins]')
		return await this.pinsService.findAll()
	}

	@Get('field/:field')
	async getPinFieldData(@PinField() field: string) {
		console.log('CONTROLLER [getPinFieldData]: ', field)
		return await this.pinsService.getPinsFieldData(field)
	}

	@Get(':title')
	async getPinTitle(@PinTitle('title') title: string) {
		console.log('CONTROLLER [getPinTitle]: ', title)
		return await this.pinsService.getPinByTitle(title)
	}

	// TODO -> Change @Body to my own decorator
	@Post()
	async createPin(@Body() pin: Pin) {
		console.log('CONTROLLER [createPin]: ', pin)
		await this.pinsService.save(pin)
		return `The pin is saved`
	}

	// @Get('pin')
	// getPinById(@PinId() pinId: string) {
	// 	console.log('CONTROLLER: ', pinId)
	// 	return { message: `Pin id: ${pinId} ` }
	// }

	// @Get('pinurl')
	// getPinUrl(@PinUrl() url: string) {
	// 	console.log('CONTROLLER: ', url)
	// 	return { message: `Pin url: ${url}` }
	// }

}
