import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import  React, {useEffect} from 'react';
import { ReactNode } from 'react';

export interface AuthProps {
  children: ReactNode
}

export function Auth ({children}: AuthProps) {
  const router = useRouter()
  const {profile, firstLoading} = useAuth()

   
  useEffect(() => {
    if(!firstLoading && !profile?.username) router.push('./login')
  }, [router, profile, firstLoading])

  if(!profile?.username) return  <p>Loading....</p>

  return (
    <div>
        {children}
    </div>
  );
}
