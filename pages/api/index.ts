// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Generator from '../../lib'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req.query)

    res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
    })

    try {
        const badge = Generator(req.query)
        res.write(badge)
    } catch (e) {
        const badge = Generator({label: 'error', status: '404s', color: 'red'})
        res.write(badge)
    }

    res.end()
}
