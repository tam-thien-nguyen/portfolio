import { authApi } from './../api-client/auth';
import  useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth(options?: Partial<PublicConfiguration>) {
    // Profile
    const {data: profile, error, mutate} = useSWR('/profile',  {
        dedupingInterval: 60 * 60 * 1000, // 1 hour
        revalidateOnFocus: false,
        ...options
    })

    const firstLoading = profile === undefined && error === undefined

    async function login() {
        await authApi.login({
            username:'test1',
            password: '123123'
        })

        // Se call useSWR lai lan nua de update profile vi luc nay da co accessToken tren cookie browser roi
        // Add await de doi goi useSWR xong rui moi refresh lai tren browser
        await mutate()
    }

    async function logout() {
        await authApi.logout()

        // xoa du lieu tam di.
        // False: ko goi lai useSWR
        mutate({}, false)
    }

    return {
        profile,
        error, 
        login,
        logout,
        firstLoading
    }
}