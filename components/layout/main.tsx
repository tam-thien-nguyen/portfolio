import { LayoutProps } from '@/models/common';
import { Box, Container, Stack } from '@mui/material';
import Link from 'next/link';
import { Footer } from '../common/ footer';
import { Header } from '../common/header';
import { grey, red } from '@mui/material/colors';


export function MainLayout({children}: LayoutProps) {
  
    return (
      <Stack minHeight='100vh'>
        <Header/>

        <Box component='main' flexGrow={1} >
          {children}
        </Box>

        <Footer/>
      </Stack>
    )
}
