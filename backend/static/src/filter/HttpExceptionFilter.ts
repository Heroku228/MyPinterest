import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const status = exception.getStatus()
		const errorResponse = exception.getResponse()

		response.status(status).json({
			statusCode: status,
			message: (errorResponse as any).message || 'Something went wrong',
			timestamp: new Date().toISOString(),
			path: ctx.getRequest().url
		})
	}
}
