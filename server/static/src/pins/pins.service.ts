import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pin } from './entities/pin.entity'

@Injectable()
export class PinsService {
	constructor(@InjectRepository(Pin) private readonly pinRepository: Repository<Pin>) { }

	async findAllUserPins(username: string) {
		return await this.pinRepository.find({
			where: { username }
		})
	}

	async clear() {
		await this.pinRepository.clear()
	}

	async save(pin: Pin) {
		return await this.pinRepository.save(pin)
	}

	async getPinsFieldData(field: string) {
		console.log('SERVICE: ', field)

		return await this.pinRepository.find({
			select: { [field]: true }
		})
	}

	async findAll() {
		return await this.pinRepository.find()
	}

	async getPinById(id: string) {
		return await this.pinRepository.findOne({ where: { id: id } })
	}

	async getPinByTitle(title: string) {
		const pin = await this.pinRepository.findOne({ where: { title } })
		console.log('SERVICE: (title) ', title)
		if (!pin)
			throw new NotFoundException('Pin not found')
		return pin
	}
}
