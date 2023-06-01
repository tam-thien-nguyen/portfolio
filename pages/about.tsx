// import Header from '@/components/header';
import { AdminLayout, MainLayout } from '@/components/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



// Neu sai nhu vay thi component Header chi dc render ben client. SSR se ko chay.
const Header = dynamic(() => import('@/components/header'), {ssr: false})


export interface  AboutPageProps {
}

export default function AboutPage (props:  AboutPageProps) {
  const [postList, setPostList] = useState([])
  const router = useRouter()

  const page = router.query?.page

  // useEffect la ham chay ben client. no ko chay ben server nhe.
  useEffect(() => {
    if(!page) return

    ; (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json()

      setPostList(data.data)
    })()
  }, [page])

  // neu set shallow true thi may cai chay ben server (neu co: vi du nhu getStaticProps) se ko dc goi lai lan nua, ma no chi trigger update ben client de add 1 vao so page 
  function handleNextClick() {
    router.push({ 
      pathname: '/about',
      query: {
        page: (Number(page) || 1) + 1
      },
    }, undefined, {shallow: true})
  }

  console.log('About Query:', router.query);

  return (
    <div>
      <h1>About paggeeee</h1>
      <Header/>

      <ul className='post-list'>
        {postList.map((post: any) => <li key={post.id}> {post.title}</li>)}
      </ul>

      <button onClick={handleNextClick}></button>
    </div>
  );
}

AboutPage.Layout = AdminLayout
