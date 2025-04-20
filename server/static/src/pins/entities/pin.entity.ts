import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Pin {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column()
	description: string

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@Column()
	url: string

	@Column({ type: 'boolean', default: false })
	isCensor: boolean
	@Column({ type: 'boolean', default: false })
	isBanned: boolean
	@Column({ type: 'boolean', default: false })
	isPopular: boolean
	@Column({ type: 'boolean', default: false })
	isHidden: boolean
}
