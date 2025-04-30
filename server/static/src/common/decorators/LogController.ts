export function LogController(): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			const result = await originalMethod.apply(this, args)
			return result
		}
	}
}
