import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcrypt'
import { ILike, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

	async clear() {
		await this.userRepository.clear()
	}


	async findAll() {
		return await this.userRepository.find()
	}

	async save(user: User) {
		const hashedPassword = await hash(user.password, 10)
		user.password = hashedPassword
		return await this.userRepository.save(user)
	}

	async getUserByUsernameOrEmail(identifier: string) {
		const user = await this.userRepository.findOne({
			where: [
				{ username: ILike(identifier) },
				{ email: ILike(identifier) }
			]
		})
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email: ILike(email) } })
		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { username: ILike(username) } })
		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async getUserById(id: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id: id } })
		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async findExistingsUser(email: string, username: string) {
		const normalizedUsername = username.toLowerCase().trim()
		const normalizedEmail = email.toLowerCase().trim()

		const existingUserByEmail = await this.userRepository.findOne({ where: { email: normalizedEmail } })
		const existingUserByUsername = await this.userRepository.findOne({ where: { username: normalizedUsername } })

		if (existingUserByEmail)
			throw new ConflictException('User with this email already exists')
		else if (existingUserByUsername)
			throw new ConflictException('User with this login already exists')
	}
}
