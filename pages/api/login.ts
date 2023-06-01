import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies  from "cookies";

type  Data = {
    message: string
}


export const config = {
    api: {
      bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(req.method !== 'POST') {
        return res.status(404).json({message: 'method not supported'})
    }

    // De tranh warning cua next tren terminal: API resolved without sending a response for /api/students/lea11ziflg8xoj09, this may result in stalled requests.
    // add Promise vao va wait khi proxy server da co response thi return resolve true
    return new Promise((resolve) => {
        // Dont send cookies from user request
        req.headers.cookie = ''

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
             let body=''

             proxyRes.on('data', function (chunk){
                body += chunk
             }) 

             proxyRes.on('end', function() {
                try {
                    const {accessToken, expiredAt} = JSON.parse(body)

                    // convert token to cookies
                    const cookies = new Cookies(req, res, {secure: process.env.NODE_ENV !== 'development'});
                    cookies.set('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: "lax",
                        expires: new Date(expiredAt)
                    });

                    (res as NextApiResponse).status(200).json({message: 'login successfully'})
                }   catch {
                    (res as NextApiResponse).status(500).json({message: 'Something went wrong'})
                } 

                resolve(true)
             })
        }

        proxy.once('proxyRes', handleLoginResponse)

        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true
        })
    })

    // res.status(200).json({name: 'Test bla blo'})
}  