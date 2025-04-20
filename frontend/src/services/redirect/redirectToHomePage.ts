import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const handleRedirectToHome = (router: AppRouterInstance) => {
	router.push(process.env.NEXT_PUBLIC_HOME_PAGE
		? process.env.NEXT_PUBLIC_HOME_PAGE
		: 'http://localhost:3001'
	)
}
