export function LogController(): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			console.log(`Calling ${String(propertyKey)} with`, args)
			const result = await originalMethod.apply(this, args)
			console.log(`Result:`, result)
			return result
		}
	}
}
