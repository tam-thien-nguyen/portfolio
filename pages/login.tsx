import * as React from 'react';
import { useAuth } from '../hooks';
import Router, { useRouter } from 'next/router';



export default function LoginPage () {
  const router = useRouter()
  const {profile, login, logout} = useAuth({
    revalidateOnMount: false
  })

  async function handleLoginClick(){
    try {
        await login()
        router.push('./about')
    } catch (error) {
        console.log('Failed to login', error)
    }
  }

  
  async function handleLogoutClick(){
    try {
        await logout()
        console.log('Logout sucessful');
    } catch (error) {
        console.log('Failed to logout', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Profile: {JSON.stringify(profile || {} )}</p>

      <button onClick={handleLoginClick}>Login</button>
      
      <button onClick={handleLogoutClick}>Logout</button>

      <button onClick={() => router.push('/about')}>Go to About</button>
    </div>
  );
}
