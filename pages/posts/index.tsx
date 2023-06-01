import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostListProps {
   posts: any[]
}

export default function PostList ({posts}: PostListProps) {
    const router = useRouter()

    function goToDetailPage() {
        router.push({
            pathname: '/posts/[postId]',
            query: {
                postId: 123,
                ref: 'social',
                test: 'balblo'
            }
        })
    }

  return (
    <div className=''>
      <Head>
        <title>Learn NextJS</title>
        <meta name='description' content='Learn NextJS + Typescript'></meta>
        <link rel='icon'/>
      </Head>

      <h1>Post page</h1>  

      <Link href="/about">
        Go to About
      </Link>

       <br/>
       
      <button onClick={goToDetailPage}>Go to Post detail page</button>
      <br/>

      <ul>
        {posts.map(post => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>))}
      </ul>
    </div>
  );
}


export const getStaticProps: GetStaticProps<PostListProps> = async (context: GetStaticPropsContext) => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json()

    return {
      props: {
        posts: data.data.map((x: any) => ({id: x.id, title: x.title}))
      }
    }
}
