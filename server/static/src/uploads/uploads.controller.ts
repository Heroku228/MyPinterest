import { Controller, Get, NotFoundException, Param, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { existsSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('uploads')
export class UploadsController {
	
	@Get('avatars/:filename')
	async getUserAvatar(@Param('filename') filename: string, @Res() res: Response) {
		const filePath = join(homedir(), 'Desktop', 'uploads', filename)
		console.log('FILE PATH', filePath)

		if (!existsSync(filePath))
			throw new NotFoundException('Avatar not found')

		return res.sendFile(filePath)
	}
}
