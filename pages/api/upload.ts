import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'
import apiHandler from '../../backend/apiHandler'
import { database } from '../../backend/firebase/firebase'

type MulterRequest = NextApiRequest & {
  file: any
}

const apiRoute = apiHandler.post(
  async (req: MulterRequest, res: NextApiResponse) => {
    aws.config.update({
      accessKeyId: process.env.PROJECT_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.PROJECT_AWS_SECRET_ACCESS_KEY,
      region: process.env.PROJECT_AWS_REGION,
      signatureVersion: 'v4',
    })

    const { query: { filename } } = req


    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new aws.S3.ManagedUpload({
      params: {
        Bucket: process.env.PROJECT_AWS_BUCKET_NAME as string,
        Key: filename as string,
        Body: req.file.buffer,
      },
    })

    const fileRef = database.ref(`/files`).child(`${filename}`)

    upload.on('httpUploadProgress', function (progress: any) {
      const uploaded = Math.floor((progress.loaded * 100) / progress.total)
      // Workaround to show 100% progress only when sending the response back
      const adjustedProgress = uploaded > 10 ? uploaded - 1 : uploaded
      fileRef.set({ progress: adjustedProgress })
    })

    var promise = upload.promise()

    promise.then(
      function (data: any) {
        fileRef.set({ progress: 100, location: data.Location })
        res.status(200).send(data)
      },
      function (error: any) {
        res.status(500).send(error)
      }
    )

  }
)

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
