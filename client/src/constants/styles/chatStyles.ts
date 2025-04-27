import { twMerge } from 'tailwind-merge'

export const chatSidebarBasicStyles = `
flex flex-col fixed w-max h-full border-r-1 chat-sidebar-border backdrop-blur-lg chat-sidebar-background-color
`

export const messageFieldStyles = `
	w-[300px] md:w-[400px] lg:w-700
	max-w-2xl min-h-[50px] max-h-[200px]
	p-4 pr-12 resize-none text-2xl
	rounded-xl border border-purple-400
	text-white placeholder-gray-400
	focus:outline-none focus:ring-2 focus:ring-purple-500
	transition-all duration-300 ease-in-out z-998
`


export const chatSidebarAdditionalStlyes = `flex flex-col h-full `

export const chatSidebarAsideContentStyles = `
'flex w-max h-full border-r-1 mt-10 chat-sidebar-border chat-sidebar-background-color py-2 px-10
`

export const roomsDefaultStyles = `
h-full mt-8 gap-6 flex py-10 px-2 flex-col gap-8col-span-1 h-max
`

export const roomsSidebarContainerStyles =
	(currentRoom: string, roomName: string) => {
		return twMerge(
			`text-white flex gap-4 items-center text-2xl sm:text-xl default-border py-2 px-4 rounded-xl cursor-pointer
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
