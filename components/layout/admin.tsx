import { LayoutProps } from '@/models/common';
import Link from 'next/link';
import * as React from 'react';
import { Auth } from '../common/auth';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';


export function AdminLayout({children}: LayoutProps) {

  const {profile, logout} =useAuth()
  const router = useRouter()
 
  async function handleLogoutClick() {
    await logout()
    router.push('./login')
  }
  
    return (
      <>
        <Auth>
          <h1>Admin Layout</h1>
          <div>Slidebar</div>

          <p>Profile: {JSON.stringify(profile)}</p>

          <div>
            <button onClick={handleLogoutClick}>Logout</button>
          </div>

          <Link href='/'>
            Home
          </Link>

          <Link href='/about'>
            About
          </Link>

          <div>{children}</div>
        </Auth>
      </>
    );
}