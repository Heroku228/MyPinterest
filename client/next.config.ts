import type { NextConfig } from "next"


const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '3000',
				pathname: '/api/v1/uploads/**'
			}
		]
	}
}

export default nextConfig
