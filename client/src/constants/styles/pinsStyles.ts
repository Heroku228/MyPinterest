
export const homePagePinsContainerStyles =
	(isPinsFetched: boolean) => {
		return isPinsFetched ? '' : `columns-2 sm:columns-3 md:columns-5 lg:columns-6 xl:columns-7 2xl:columns-8 h-max min-h-screen p-10 w-max mx-auto`
	}
