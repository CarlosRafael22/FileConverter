import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'
import apiHandler from '../../backend/apiHandler'

type MulterRequest = NextApiRequest & {
  file: any
}

type SocketApiResponse = NextApiResponse & {
  socket: any
}

const apiRoute = apiHandler.post(
  (req: MulterRequest, res: SocketApiResponse) => {
    aws.config.update({
      accessKeyId: process.env.PROJECT_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.PROJECT_AWS_SECRET_ACCESS_KEY,
      region: process.env.PROJECT_AWS_REGION,
      signatureVersion: 'v4',
    })

    // make it available to httpUploadProgress
    let io = res.socket.server.io
    const originalName = req.file.originalname
    const filename = `${originalName}-${Date.now()}`

    console.log('NO SERVER: ', req.file)
    console.log(req.file.buffer)
    console.log(filename)

    // console.log('VAI MANDAR OS EMIT')
    // try {
    //   console.log(res.socket.server.io)
    //   console.log('1111111111')
    //   res.socket.server.io.sockets.emit('hello', 'there')
    //   console.log('22222222222')
    //   res.socket.server.io.emit('progress', 40)
    //   console.log('333333333333')
    //   io.sockets.emit('progress', 50)
    //   console.log('4444444444444')
    //   io.emit('progress', 60)
    // } catch (error) {
    //   console.log('ERROR: ', error)
    // }

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new aws.S3.ManagedUpload({
      params: {
        Bucket: process.env.PROJECT_AWS_BUCKET_NAME as string,
        Key: filename,
        Body: req.file.buffer,
      },
    })

    upload.on('httpUploadProgress', function (progress: any) {
      const uploaded = Math.floor((progress.loaded * 100) / progress.total)
      console.log('PROGRESSSS: ', uploaded, filename)
      // Workaround to show 100% progress only when sending the response back
      const adjustedProgress = uploaded > 10 ? uploaded - 10 : uploaded
      io.sockets.emit('updateProgress', adjustedProgress)
    })

    var promise = upload.promise()

    promise.then(
      function (data: any) {
        console.log('Successfully uploaded photo.')
        console.log(data)
        io.sockets.emit('updateProgress', 100)
        res.status(200).send(data)
      },
      function (error: any) {
        console.log(error)
        res.status(500).send(error)
      }
    )

    // res.end()
  }
)

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
