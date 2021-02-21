import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'

const uploadMiddleware = multer().single('file')

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onError(error, req, res) {
    console.log('NO ERROR DO SERVER: ', error.message)
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

const multerUpload = nextConnect().use('/api/upload', uploadMiddleware)
apiHandler.use(multerUpload)

export default apiHandler
