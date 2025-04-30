import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Username = createParamDecorator((username: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.query[username]
})
