import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { User } from 'static/src/users/entities/user.entity'


@Injectable()
export class EmailValidationPipe implements PipeTransform {
	transform(value: User, metadata: ArgumentMetadata) {
		console.log('PIPE [EmailValidationPipe] (value): ', value)
		console.log('PIPE [EmailValidationPipe] (value.email): ', value.email)
		console.log('PIPE [EmailValidationPipe] (metadata): ', metadata)

		if (value.email && !value.email.includes('@'))
			value.email += '@gmail.com'

		return value
	}
}
