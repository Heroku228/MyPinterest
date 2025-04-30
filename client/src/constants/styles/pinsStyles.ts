
export const homePagePinsContainerStyles =
	(isPinsFetched: boolean) => {
		return isPinsFetched ? '' : `columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 h-max min-h-screen p-10 w-max mx-auto`
	}
