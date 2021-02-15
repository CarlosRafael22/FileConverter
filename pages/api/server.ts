import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import aws from 'aws-sdk'

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer()

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: http.IncomingMessage, res: http.ServerResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single('file')

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware)

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })

  const filename = req.file.originalname
  console.log('NO SERVER: ', req.file)
  console.log(req.file.buffer)
  console.log(filename)

  const s3 = new aws.S3({
    params: { Bucket: process.env.AWS_BUCKET_NAME },
  })

  // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new aws.S3.ManagedUpload({
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: req.file.buffer,
    },
  })

  upload.on('httpUploadProgress', function (progress) {
    var uploaded = parseInt((progress.loaded * 100) / progress.total)
    console.log('PROGRESSSS: ', uploaded)
  })

  var promise = upload.promise()

  promise.then(
    function (data) {
      console.log('Successfully uploaded photo.')
      console.log(data)
      res.status(200).send(data)
      // viewAlbum(albumName);
    },
    function (error) {
      console.log(error)
      res.status(500).send(error)
      // return alert("There was an error uploading your photo: ", err.message);
    }
  )
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
