import type { NextApiRequest, NextApiResponse } from "next";

type  Data = {
    data: any[], 
    pagination: any
} | { name: string}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'GET') {
        return res.status(404).json({message: 'Method not supported'})
    }

    const response = await fetch ('https://js-post-api.herokuapp.com/api/posts?_page=1&?limit=10')
    const responseJSON = await response.json()

    return res.status(200).json(responseJSON)
}