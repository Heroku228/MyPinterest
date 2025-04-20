import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class UserGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const isTokenExists = request.headers.authorization === 'token1234'

		if (isTokenExists) return isTokenExists
		else throw new UnauthorizedException('Invalid or missing token')
	}
}
