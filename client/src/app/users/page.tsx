'use client'
import { Button } from '@/components/ui/Button'
import axios from '@/services/axiosInstance'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ListOfUsers() {
	const [showError, setShowError] = useState<string | null>(null)
	const [users, setUsers] = useState<any[]>([])

	useEffect(() => {
		const fetchAllUsers = async () => {
			const response = await axios
				.get('users/all-users')
				.catch(err => console.error(err))

			if (!response) {
				setShowError('Network error...')
				return
			}
			console.log(response.data)

			setUsers(response.data)
		}
		fetchAllUsers()
	}, [])

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
			{users.map((user, index) => (
				<Link
					href={`/profile/${user.username}`}
					key={index}
					className='text-white default-border w-max py-2 px-4 rounded-lg my-8 flex gap-8 items-center transition cursor-pointer duration-300 hover:scale-102 hover:brightness-70 chat-sidebar-background-color w-50 md:w-75 lg:w-md overflow-hidden'
				>
					<img
						className='w-16 h-16 lg:w-24 lg:h-24 rounded-full'
						src={`http://localhost:3000/api/v1/uploads/avatars/${user.username}/${user.userIconUrl}`}
						alt='user icon'
					/>
					<div>
						<h1 className='italic text-md lg:text-xl font-bold'>
							{user.username}
						</h1>
						<h2 className='italic text-sm md:text-md lg:text-xl'>
							{user.email}
						</h2>
					</div>
				</Link>
			))}
			{showError ? (
				<div>
					<h1>{showError}</h1>
					<Button>Reload</Button>
				</div>
			) : null}
		</div>
	)
}
