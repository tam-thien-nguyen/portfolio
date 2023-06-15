import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getPostList } from '@/utils/post';
import { MainLayout } from '@/components/layout';
import { Box, Container, Divider } from '@mui/material';
import { PostItem } from '@/components/blog';
import { Post } from '@/models';

export interface BlogListProps {
   posts: Post[]
}

export default function BlogListPage ({posts}: BlogListProps) {
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
    <Box className=''>
        <Container>
            <h1>Blog page</h1>  

            <Box component='ul' sx={{listStyleType: 'none', p: 0}}>
            {posts.map(post => (
            <li key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                <PostItem post={post}/>
                </Link>

                <Divider sx={{ my: 3}}/>
            </li>))}
            </Box>
        </Container>
    </Box>
  );
}

// Server Side build time
export const getStaticProps: GetStaticProps<BlogListProps> = async () => {
    // Read markdown files into javascript objects
    const postList  = await getPostList()

    return {
      props: {
        posts: postList
      }
    }
}

BlogListPage.Layout = MainLayout
