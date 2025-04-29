import { Body, Controller, Get, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import { homedir } from 'os'
import { dirname, join } from 'path'
import { PinField, PinTitle } from 'static/src/common/decorators/pin.decorator'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/currrentuser.decorator'
import { IUser } from '../types/socket/TPayloadBody'
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

	@Post('save-pin')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async createPin(
		@UploadedFile('file') file: Express.Multer.File,
		@Body() createPinDto: any,
		@CurrentUser() user: IUser) {
		console.log('USER: ', user)
  
		const filePath = join(homedir(), 'Desktop', 'pins', user.username, file.originalname)
		mkdirSync(dirname(filePath), { recursive: true })
		writeFile(filePath, file.buffer)

		return {
			
		}
	}
}
