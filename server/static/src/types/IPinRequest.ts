import { Request } from 'express'
import { Pin } from 'static/src/pins/entities/pin.entity'

export interface IPinRequest extends Request {
	pin?: Pin
	title?: string
	field?: string
} 
