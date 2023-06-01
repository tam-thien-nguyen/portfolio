import type { NextApiRequest, NextApiResponse } from "next";

type  Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.status(200).json({name: 'Get Product details'})
}