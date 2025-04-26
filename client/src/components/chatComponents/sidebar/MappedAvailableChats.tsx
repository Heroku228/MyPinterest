import { ROOMS } from '@/constants/enums/Rooms'
import { currentRoomStyles } from '@/constants/styles/messageFieldStyles'
import { useConnectServer } from '@/hooks/context/chat/useConnectServer'
import { Server } from 'lucide-react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
					className={twMerge(
						`text-white mx-auto rounded-md text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl cursor-pointer px-6 py-1 flex gap-4 overflow-hidden transition-all duration-300 ease-in-out transform border border-purple-400${currentRoomStyles(
							currentRoom,
							room.name
						)}`
					)}
					onClick={() => handleClick(room.name)}
				>
					<Server size={30} className='text-white' />
					{room.name}
				</div>
			))}
		</>
	)
}
