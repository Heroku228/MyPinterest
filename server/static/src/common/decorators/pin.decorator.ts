import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const PinId = createParamDecorator((url: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.query.pinId
})

export const PinUrl = createParamDecorator((url: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.query.url
})

export const PinTitle = createParamDecorator((title: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	console.log('DECORATOR (req.title): ', request.title)
	console.log('DECORATOR: (title)', title)
	return title ? request[title] : undefined
})


export const PinField = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	console.log('DECORATOR: ', request.field)
	return request.field
})
