import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PinMiddleWare } from 'static/src/middleware/pin.middleware'
import { Pin } from './entities/pin.entity'
import { PinsController } from './pins.controller'
import { PinsService } from './pins.service'

@Module({
	imports: [TypeOrmModule.forFeature([Pin])],
	controllers: [PinsController],
	providers: [PinsService],
})

export class PinsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PinMiddleWare)
			.forRoutes('pins')
	}
}

