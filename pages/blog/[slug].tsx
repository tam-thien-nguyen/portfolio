import { Post } from '@/models';
import { getPostList } from '@/utils/post';
import { Box, Container, Divider } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype/lib';
import remarkToc from 'remark-toc';
import { unified } from 'unified';
import Script from 'next/script'
import { Seo } from '@/components/common/seo';
import { MainLayout } from '@/components/layout';

export interface BlogPageProps {
  post: Post
}


// Dau tien thang nay se dc goi : getStaticPaths
// getStaticPaths: se lay tat ca cac bai posts p page 1
// Sau do data se dc truyen qua Params sang getStaticProps
// getStaticProps: lay noi dung cua 1 bai post
// sau do goi PostPageProps de render ra thong tin cua 1 post
// getStaticPaths va getStaticProps la Only chay tren server.
export default function BlogPageProps ({post}: BlogPageProps) {
    const router = useRouter()
    const host_url= process.env.HOST_URL;
    console.log('host_url', host_url)

    if(!post) return null

   // Script la cach add js lib vao ts,  strategy='afterInteractive' y la ko quan trong. no se dc load sau khi cac thang script quan trong khac da loaded.
  return (
    <Box>
      <Seo data={{
				title: post.title,
				description: post.description,
				thumbnailUrl: post.thumbnailUrl || 'https://res.cloudinary.com/dwjea9rmo/image/upload/v1686573032/nextjs/u1qepkpib8npkpbdlnar.png',
				url: `${host_url}/blobssssss/${post.slug}`
			}}/>

      <Container>
          <h1>Post Detail page</h1>
          <p>{post.title}</p>
          <p>{post.author?.name}</p>

          <Divider/>

          <div dangerouslySetInnerHTML={{ __html: post.htmlContent || ''}}></div>  
      </Container>

      <Script src='/prism.js' strategy='afterInteractive'></Script>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList()

  return {
    paths: postList.map((post: Post) => ({params: {slug: post.slug}})),
    fallback: false
  }
}

// revalidate: 5 => la sau 5 giay khi user request page no se van tra ve gia tri cu trong cache va in background update gia tri moi.
// o lan ke tiep khi user request lai se nhan dc gia tri moi. Vi da dc update len cache o lan truoc roi.
// day la ISR
export const getStaticProps: GetStaticProps<BlogPageProps> = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug
  if (!slug) return {notFound: true}
  
  const postList = await getPostList()
  const post = postList.find(x => x.slug === slug)
  if (!post) return {notFound: true}
  
  // Parse markdown to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, {heading: 'agenda'})
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {behavior: 'wrap'})
    .use(rehypeDocument, {title: 'Blog details page'})
    .use(rehypeFormat)
    .use(rehypeStringify)
    
    .process(post.mdContent || '')
      
  post.htmlContent = file.toString()

  return {
    props: {
      post: post
    }
  }
} 


BlogPageProps.Layout = MainLayout

