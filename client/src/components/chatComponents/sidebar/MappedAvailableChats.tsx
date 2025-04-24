import { ROOMS } from '@/constants/enums/Rooms'
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
		<>
			{ROOMS.map(room => (
				<div
					key={room.name}
					className={`text-white mx-auto rounded-md text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl cursor-pointer px-6 py-1 flex gap-4 overflow-hidden transition-all duration-300 ease-in-out transform border border-purple-400
					${
						currentRoom === room.name
							? 'bg-gradient-to-r from-blue-600 via-purple-500 to-purple-500 border-white scale-105 shadow-lg'
							: 'hover:scale-105 hover:bg-purple-900'
					}`}
					onClick={() => handleClick(room.name)}
				>
					<Server size={30} className='text-white' />
					{room.name}
				</div>
			))}
		</>
	)
}
