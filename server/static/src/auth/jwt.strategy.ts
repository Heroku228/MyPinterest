import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { config } from 'dotenv'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					let token = null

					if (req && req.cookies) token = req.cookies['token']
					return token
				}
			]),
			ignoreExpiration: false,
			secretOrKey: String(process.env.SECRET_KEY)
		})
	}

	async validate(payload: { userId: string }) {
		const user = await this.authService.validate(payload.userId)
		if (!user) throw new UnauthorizedException()
		return user
	}
}
