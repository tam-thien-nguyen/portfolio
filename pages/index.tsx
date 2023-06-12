import { Seo } from '@/components/common/seo'
import { FeatureWork, HeroSection } from '@/components/home'
import { RecentPosts } from '@/components/home/recent-posts'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import { NextPageWithLayout } from '../models'

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
			<Seo data={{
				title:'Tam Nguyen Portfolio',
				description:'Highly skilled and innovative IT professional with a proven track record in software development. Proficient in Nodejs, Nextjs, docker, Scrum, Micro services. Strong problem-solving abilities with a keen eye for detail. Excellent communication and teamwork skills, enabling effective collaboration with diverse stakeholders. Passionate about staying up-to-date with the latest industry trends and advancements. Committed to delivering high-quality solutions to drive business growth and optimize operational efficiency.',
				thumbnailUrl:'https://res.cloudinary.com/dwjea9rmo/image/upload/v1686573032/nextjs/u1qepkpib8npkpbdlnar.png',
				url:'https://nextjs-khaki-one-24.vercel.app/'
			}}/>
			

			<HeroSection />
			<RecentPosts/>
			<FeatureWork/>
		</Box>
	)
}

Home.Layout = MainLayout

export default Home