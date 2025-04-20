import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { IUserRequest } from 'static/src/types/user/IUserRequest'

@Injectable()
export class UserMiddleWare implements NestMiddleware {
	async use(req: IUserRequest, res: Response, next: NextFunction) {
		console.log('req.path: ', req.path)
		console.log('req.url: ', req.url)

		req.username = req.url.replace('/user/', '').toLowerCase().trim()
		console.log(req.username)
		return next()
	}

}
