import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
  post: any
}


// Dau tien thang nay se dc goi : getStaticPaths
// getStaticPaths: se lay tat ca cac bai posts p page 1
// Sau do data se dc truyen qua Params sang getStaticProps
// getStaticProps: lay noi dung cua 1 bai post
// sau do goi PostPageProps de render ra thong tin cua 1 post
// getStaticPaths va getStaticProps la Only chay tren server.
export default function PostPageProps ({post}: PostPageProps) {
    const router = useRouter()

    if(!post) return null

  return (
    <div>
        <h1>Post Detail page</h1>
        <p>{post.title}</p>
        <p>{post.author}</p>
        <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await response.json()


  return {
    paths: data.data.map((post: any) => ({params: {postId: post.id}})),
    fallback: true
  }
}

// revalidate: 5 => la sau 5 giay khi user request page no se van tra ve gia tri cu trong cache va in background update gia tri moi.
// o lan ke tiep khi user request lai se nhan dc gia tri moi. Vi da dc update len cache o lan truoc roi.
// Neu co revalidate thi la ISR
export const getStaticProps: GetStaticProps<PostPageProps> = async (context: GetStaticPropsContext) => {
  const postId = context.params?.postId

  if (!postId) return {notFound: true}

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await response.json()

  return {
    props: {
      post: data
    },
    revalidate: 5,
  }
} 


