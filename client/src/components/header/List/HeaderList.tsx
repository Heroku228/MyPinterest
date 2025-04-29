'use client'
import { Input } from '@/components/ui/Input'
import { LiItem } from '@/components/ui/Li'
import { STYLES_VARIANTS } from '@/constants/enums/ButtonVariant'
import { ROUTES } from '@/constants/routes'
import { useWindowSize } from '@/hooks/useWindowSize'
import { Menu, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BurgerMenu } from './BurgerMenu'
import { MobileSearchInput } from './MobileSearchInput'

export const HeaderList = ({}) => {
	const router = useRouter()
	const { width } = useWindowSize()

	const burgerMenuRef = useRef<HTMLDivElement | null>(null)
	const searchInputRef = useRef<HTMLInputElement | null>(null)

	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [showSearch, setShowSearch] = useState<boolean>(false)

	const handleClick = (path: string) => {
		if (path) router.push(path)
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			const target = event.target as Node

			if (burgerMenuRef.current && !burgerMenuRef.current.contains(target))
				setShowMenu(false)

			if (searchInputRef.current && !searchInputRef.current.contains(target))
				setShowSearch(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [])

	return (
		<ul
			className={`
			${width < 800 ? '' : 'px-20'}
			flex items-center justify-evenly w-full
		`}
		>
			<LiItem onClick={() => handleClick(ROUTES.HOME)}>Explore</LiItem>

			{width < 1000 ? (
				<div className='relative cursor-pointer'>
					<Search
						onClick={() => {
							setShowSearch(true)
							setShowMenu(false)
						}}
						size={30}
					/>
					<MobileSearchInput ref={searchInputRef} showSearch={showSearch} />
				</div>
			) : (
				<LiItem additionalStyles=''>
					<Input
						placeholder='Search'
						variant={STYLES_VARIANTS.PRIMARY}
						ref={null}
					/>
				</LiItem>
			)}

			{width < 1600 ? (
				<div
					ref={burgerMenuRef}
					onClick={() => {
						setShowSearch(false)
						setShowMenu(!showMenu)
					}}
					className='relative'
				>
					<Menu className='cursor-pointer' size={40} />
					<BurgerMenu showMenu={showMenu} />
				</div>
			) : (
				<>
					<LiItem onClick={() => handleClick(ROUTES.CHAT)}>Chat</LiItem>
					<LiItem onClick={() => handleClick(ROUTES.CREATE_PIN)}>
						Create pin
					</LiItem>
				</>
			)}
		</ul>
	)
}
