import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class UserInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		console.log('INTERCEPTOR[UserInterceptor] BEFORE REQUEST')
		console.log(Date.now())
		const now = Date.now()

		return next.handle().pipe(
			tap(() => console.log(`After request... Execution time: ${Date.now() - now}ms`))
		)
	}
}
