import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { Pin } from 'static/src/pins/entities/pin.entity'
import { User } from 'static/src/users/entities/user.entity'

config()

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.POSTGRESQL_HOST,
	port: Number(process.env.POSTGRESQL_PORT),
	database: process.env.POSTGRESQL_DATABASE,
	username: process.env.POSTGRESQL_USERNAME,
	password: process.env.POSTGRESQL_PASSWORD,
	entities: [Pin, User],
	synchronize: true
}
