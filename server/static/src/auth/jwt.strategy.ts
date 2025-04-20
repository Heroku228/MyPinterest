import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { config } from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: String(process.env.SECRET_KEY)
		})
	}

	async validate(payload: { userId: string }) {
		const user = await this.authService.validate(payload.userId)
		if (!user) throw new UnauthorizedException()
		return user
	}
}
