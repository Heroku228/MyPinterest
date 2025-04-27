import { twMerge } from 'tailwind-merge'

export const messageFieldStyles = `
	transform -translate-x-1/2
	w-[700px]
	max-w-2xl min-h-[50px] max-h-[200px]
	p-4 pr-12 resize-none text-2xl
	rounded-xl border border-purple-400
	text-white placeholder-gray-400
	focus:outline-none focus:ring-2 focus:ring-purple-500
	transition-all duration-300 ease-in-out z-998
`


export const roomsSidebarContainerStyles =
	(currentRoom: string, roomName: string) => {
		return twMerge(
			`text-white flex gap-4 items-center text-2xl default-border py-3 px-4 rounded-xl cursor-pointer
			 ${currentRoomStyles(
				currentRoom,
				roomName
			)}`
		)
	}

const currentRoomStyles = (currentRoom: string, roomName: string) => {
	return currentRoom === roomName
		? 'bg-gradient-to-r from-blue-600 via-purple-500 to-purple-500 border-white scale-105 shadow-lg'
		: 'hover:scale-105 hover:bg-purple-500'
}
