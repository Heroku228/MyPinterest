import { ROOMS } from '@/constants/enums/Rooms'
import {
	roomsDefaultStyles,
	roomsSidebarContainerStyles,
} from '@/constants/styles/chatStyles'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { Server } from 'lucide-react'
import { useEffect, useState } from 'react'

export const MappedAvailableChats = () => {
	const [currentRoom, setCurrentRoom] = useState<string>('Room#1')
	const [prevRoom, setPrevRoom] = useState<string | null>(null)

	const { width } = useWindowSize()
	const { socket, room, handleRoom } = useConnectServer()

	useEffect(() => {
		setPrevRoom(room)
	}, [room])

	const handleClick = async (roomName: string) => {
		setCurrentRoom(roomName)

		if (roomName && !room) await handleRoom(roomName)
		else {
			socket?.emit('leave-room', prevRoom)
			await handleRoom(roomName)
		}
	}

	return (
		<div className={roomsDefaultStyles}>
			{ROOMS.map(room => (
				<div
					key={room.name}
					className={roomsSidebarContainerStyles(currentRoom, room.name)}
					onClick={() => handleClick(room.name)}
				>
					{width < 1000 ? null : <Server size={30} className='text-white' />}
					{room.name}
				</div>
			))}
		</div>
	)
}
