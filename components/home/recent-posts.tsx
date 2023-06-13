import { Post } from '@/models';
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { PostCard } from './post-card';


export function RecentPosts () {
    const postList: Post[] =  [
        {
            id: '1',
            slug:'',
            title: 'Making a design system from scratch',
            publishedDate: '2023-06-13T10:00:00Z',
            tagList: ['Design', 'Pattern'],
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        },
        {
            id: '2',
            slug:'',
            title: 'Creating pixel perfect icons in Figma',
            publishedDate: '2023-06-13T10:00:00Z',
            tagList: ['Figma', 'Icon Design'],
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        }
    ]


  return (
    <Box component='section' bgcolor='secondary.light' pt={2} pb={4}> 
        <Container>
            <Stack direction='row' mb={2} justifyContent={{xs: 'center', md: 'space-between'}} alignItems='center'>
                <Typography variant='h6'>Recent Posts</Typography>
                <Link passHref legacyBehavior  href='/blog'>
                    <MuiLink sx={{display: {xs: 'none', md: 'inline-block'}}}>View all</MuiLink>
                </Link>
            </Stack> 
 
 
            <Stack direction={{xs: 'column', md: 'row'}} spacing={3}>

                {postList.map(post => (
                    <Box key={post.id} sx={{width: {xs: '100%', md: '50%'}}}>
                        <PostCard post={post}/>
                    </Box>
                ))}
            </Stack>
        </Container>
    </Box>
  );
}
