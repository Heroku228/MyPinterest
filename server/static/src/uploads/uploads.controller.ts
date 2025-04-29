import { Body, Controller, Get, NotFoundException, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { existsSync, readdirSync } from 'fs'
import { homedir } from 'os'
import { extname, join } from 'path'
import { Pin } from '../pins/entities/pin.entity'

@Controller('uploads')
export class UploadsController {

	@Get('avatars/:filename')
	async getUserAvatar(@Param('filename') filename: string, @Res() res: Response) {
		const filePath = join(homedir(), 'Desktop', 'uploads', filename)

		if (!existsSync(filePath))
			throw new NotFoundException('Avatar not found')

		return res.sendFile(filePath)
	}


	@Get('all-pins')
	async getAllPinst() {
		const folderPath = join(homedir(), 'Desktop', 'uploads')
		const validExtensions = ['.jpg', '.jpeg', '.png', '.webp']

		try {
			const files = readdirSync(folderPath)
				.filter(file => validExtensions.includes(extname(file)
					.toLowerCase()))

			const fileUrls = files.map(filename => {
				`http://localhost:3000/api/v1/uploads/avatars/${filename}`
			})

			return { images: fileUrls }
		} catch (err) {
			throw new NotFoundException('Could not read uploads directory')
		}
	}
}
