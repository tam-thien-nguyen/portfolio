import { Post } from '@/models/post';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import { PostItem } from '../blog/post-item';

export interface PostCardProps {
  post: Post
}

export function PostCard({post}: PostCardProps) {
  if(!post) return null

  return (
    <Card>
      <CardContent>
        <PostItem post={post}/>
      </CardContent>
    </Card>
  );
}
