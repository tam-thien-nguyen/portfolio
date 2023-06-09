import { Work } from '@/models';
import { Box, Container, Stack, Typography } from '@mui/material';
import { PostCard } from './post-card';
import { WorkList } from '../work/work-list';


export function FeatureWork () {
    const workList: Work[] =  [
        {
            id: '1',
            title: 'Designing Dashboards',
            createdAt: '1686139787576', 
            updatedAt:'1686139787576',
            tagList: ['Dashboard'],
            shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            fullDescription: '',
            thumbnailUrl:'https://res.cloudinary.com/dwjea9rmo/image/upload/v1686311065/nextjs/iffgtdkylguciwh8rnqq.jpg'
        },
        {
            id: '2',
            title: 'Vibrant Portraits of 2020',
            createdAt: '1686139787576',
            updatedAt: '1686139787576',
            tagList: ['Illustration'],
            shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            fullDescription: '',
            thumbnailUrl:'https://res.cloudinary.com/dwjea9rmo/image/upload/v1686311065/nextjs/mzb3qddhwddonpc3sjn0.jpg'
        },
        {
            id: '3',
            title: '36 Days of Malayalam type',
            createdAt: '1686139787576',
            updatedAt: '1686139787576',
            tagList: ['Typography'],
            shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            fullDescription: '',
            thumbnailUrl:'https://res.cloudinary.com/dwjea9rmo/image/upload/v1686311065/nextjs/ayj9pba2agvsni6d3hnk.jpg'
        }
    ]


  return (
    <Box component='section' pt={2} pb={4}> 
        <Container>
            <Typography variant='h6' my={4}>Featured Works</Typography>
                
            <WorkList workList={workList}/>
        </Container>
    </Box>
  );
}
