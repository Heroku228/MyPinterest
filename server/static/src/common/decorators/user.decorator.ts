import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Username = createParamDecorator((username: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	console.log('MIDDLEWARE [Username] (req.query): ', request.query)
	console.log('MIDDLEWARE [Username] (req.query[data])', request.query[username])
	return request.query[username]
})
