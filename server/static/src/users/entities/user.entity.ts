import { MaxLength, MinLength } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	username: string

	@Column()
	@MinLength(6, { message: 'The password cannot be less than 6 characters' })
	@MaxLength(24, { message: 'The password cannot be more than 24 characters' })
	password: string

	@Column({ unique: true })
	email: string

	// @Column()
	// userIconUrl: string

	@CreateDateColumn()
	createadAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@Column({ type: 'boolean', default: false })
	isBanned: boolean

	@Column({ type: 'boolean', default: false })
	isBlocked: boolean

	@Column({ type: 'boolean', default: false })
	isStatusExpired: boolean
}
