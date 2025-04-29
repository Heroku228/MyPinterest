import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import { homedir } from 'os'
import { dirname, join } from 'path'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/currrentuser.decorator'
import { SERVER_RESPONSE } from '../consts/enums/API-Response'
import { IUser } from '../types/socket/TPayloadBody'
import { CreatePinDto } from './dto/create-pin.dto'
import { ResponsePinDto } from './dto/responsePinDto.dto'
import { PinsService } from './pins.service'

@Controller('pins')
@UseFilters(HttpExceptionFilter)
export class PinsController {
	constructor(private readonly pinsService: PinsService) { }

	@Get('all')
	async getAllPins() {
		return await this.pinsService.findAll()
	}

	@Get('get-user-pins')
	async getUserPins() { }

	@Get('recommendations')
	async recommendations() { }

	
	// ONLY USER IMAGE
	@Get('pin-image/:imageUrl')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('filename'))
	async getPinImage(@Param('filename') filename: string, @Res() res: Response, @CurrentUser() user: IUser) {
		const imageFile = join(homedir(), 'desktop', 'pins', user.username, filename)
		console.log('FILE: ', imageFile)
		return res.sendFile(imageFile)
	}

	@Post('save-pin')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async createPin(
		@UploadedFile('file') file: Express.Multer.File,
		@Body() createPinDto: CreatePinDto,
		@CurrentUser() user: IUser) {
		console.log('USER: ', user)
		console.log('dto', createPinDto)

		const filePath = join(homedir(), 'Desktop', 'pins', user.username, file.originalname)
		mkdirSync(dirname(filePath), { recursive: true })
		writeFile(filePath, file.buffer)

		if (!filePath) return {
			status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.ERROR,
			message: SERVER_RESPONSE.SERVER_RESPONSE_MESSAGE.NO_PIN_IMAGE
		}

		const response: ResponsePinDto = {
			title: createPinDto.title,
			description: createPinDto.description,
			imageUrl: `http://localhost:3001/api/v1/pins/pin-image/${file.originalname}`
		}

		console.log('RESPONSE :', response)

		return {
			status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.OK,
			message: SERVER_RESPONSE.SERVER_RESPONSE_MESSAGE.PIN_CREATED_SUCCESSFULLY,
			createdPin: response
		}
	}
}
