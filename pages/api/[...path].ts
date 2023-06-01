import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

// type  Data = {
//     name: string
// }


export const config = {
    api: {
      bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    // De tranh warning cua next tren terminal: API resolved without sending a response for /api/students/lea11ziflg8xoj09, this may result in stalled requests.
    // add Promise vao va wait khi proxy server da co response thi return resolve true
    return new Promise((resolve) => {
        //convert cookies to header authorization
        const cookies = new Cookies(req, res);
        const access_token = cookies.get('access_token')
        if(access_token){
            req.headers.Authorization = 'Bearer ' + access_token
        }

        // Dont send cookies from user request
        req.headers.cookie = ''

        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false
        })

        proxy.once('proxyRes', () => {
            resolve(true)
        })
    })

    // res.status(200).json({name: 'Test bla blo'})
}  