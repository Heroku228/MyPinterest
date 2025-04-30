import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { existsSync, mkdirSync } from 'fs'
import { mkdir, readdir, writeFile } from 'fs/promises'
import { homedir } from 'os'
import { dirname, join } from 'path'
import { HttpExceptionFilter } from 'static/src/filter/HttpExceptionFilter'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/currrentuser.decorator'
import { SERVER_RESPONSE } from '../consts/enums/API-Response'
import { IUser } from '../types/socket/TPayloadBody'
import { CreatePinDto } from './dto/create-pin.dto'
import { ResponsePinDto } from './dto/responsePinDto.dto'
import { Pin } from './entities/pin.entity'
import { PinsService } from './pins.service'

@Controller('pins')
@UseFilters(HttpExceptionFilter)
export class PinsController {
	constructor(private readonly pinsService: PinsService) { }

	@Get('all')
	async getAllPins() {
		return await this.pinsService.findAll()
	}

	@Get('get-user-pins/:username')
	async getUserPins(
		@Param('username') username: string,
		@Res() res: Response,
	) {
		const pathToUserDirectory = join(homedir(), 'Desktop', 'pins', username)
		console.log('pathtouserdirectory: ', pathToUserDirectory)

		if (!existsSync(pathToUserDirectory))
			await mkdir(pathToUserDirectory, { recursive: true })

		const content = await readdir(pathToUserDirectory)
		const files = content.map(file => `http://localhost:3000/api/v1/pins/pin-image/${username}/${file}`)
		return res.json(files)
	}

	@Delete('clear')
	async clearAllPins() {
		await this.pinsService.clear()
	}

	@Get('recommendations')
	async recommendations() { }


	@Get('pin-image/:username/:filename')
	@UseInterceptors(FileInterceptor('filename'))
	async getPinImage(
		@Param('filename') filename: string,
		@Param('username') username: string,
		@Res() res: Response
	) {
		const imageFile = join(homedir(), 'Desktop', 'pins', username, filename)
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
		await writeFile(filePath, file.buffer)

		if (!filePath) return {
			status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.ERROR,
			message: SERVER_RESPONSE.SERVER_RESPONSE_MESSAGE.NO_PIN_IMAGE
		}

		const pathToFile = `http://localhost:3000/api/v1/pins/pin-image/${user.username}/${file.originalname}`

		createPinDto.url = pathToFile
		createPinDto.username = user.username

		console.log(createPinDto)

		await this.pinsService.save(plainToInstance(Pin, createPinDto))

		const response: ResponsePinDto = {
			title: createPinDto.title,
			description: createPinDto.description,
			imageUrl: pathToFile
		}

		console.log('RESPONSE :', response)

		return {
			status: SERVER_RESPONSE.SERVER_RESPONSE_STATUS.OK,
			message: SERVER_RESPONSE.SERVER_RESPONSE_MESSAGE.PIN_CREATED_SUCCESSFULLY,
			createdPin: response
		}
	}
}
