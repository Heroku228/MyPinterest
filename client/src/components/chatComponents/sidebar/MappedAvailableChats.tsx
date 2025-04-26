import { ROOMS } from '@/constants/enums/Rooms'
import { roomsSidebarContainerStyles } from '@/constants/styles/messageFieldStyles'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { Server } from 'lucide-react'
import { useEffect, useState } from 'react'

export const MappedAvailableChats = () => {
	const [currentRoom, setCurrentRoom] = useState<string>('Room#1')
	const [prevRoom, setPrevRoom] = useState<string | null>(null)

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
		<div className='h-full mt-8 flex py-10 px-2 flex-col gap-8'>
			{ROOMS.map(room => (
				<div
					key={room.name}
					className={roomsSidebarContainerStyles(currentRoom, room.name)}
					onClick={() => handleClick(room.name)}
				>
					<Server size={30} className='text-white' />
					{room.name}
				</div>
			))}
		</div>
	)
}
