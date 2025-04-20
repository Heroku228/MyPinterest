import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { IPinRequest } from 'static/src/types/IPinRequest'


@Injectable()
export class PinMiddleWare implements NestMiddleware {
	async use(req: IPinRequest, res: Response, next: NextFunction) {
		console.log('REQ.PATH: ', req.path)
		console.log('PIN MIDDLEWARE')

		if (req.method !== 'GET') return next()

		if (req.path.startsWith('/field')) {
			const field = req.url.replace('/', '')
			if (!field) throw new NotFoundException('Pin field not provided')
			req.field = field.replace('field/', '')
			return next()
		}

		const title = req.url.replace('/', '')
		if (!title) throw new NotFoundException('Pin title not provided')
		req.title = title
		console.log('MIDDLEWARE: ', title)
		return next()
	}
}
