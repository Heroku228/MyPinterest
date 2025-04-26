'use client'
import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		height: 0,
		width: 0,
	})

	useLayoutEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return windowSize
}
