import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import { NextPageWithLayout } from '../models'
import { HeroSection } from '@/components/home'
import { RecentPosts } from '@/components/home/recent-posts'

// Layout: khai bao 1 custom Layout. Custom Layout = NextPage + ten layout 
const Home: NextPageWithLayout = () => {
	const router = useRouter()

	function goToDetailPage() {
		router.push({
			pathname: '/posts/[postId]',
			query: {
				postId: 123,
				ref: 'social',
			},
		})
	}

	return (
		<Box>
			<HeroSection />

			<RecentPosts/>
		</Box>
	)
}

Home.Layout = MainLayout

export default Home