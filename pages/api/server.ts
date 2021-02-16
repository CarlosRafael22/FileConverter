import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'
import { Server } from 'socket.io'
import apiHandler from '../../backend/apiHandler'

const apiRoute = apiHandler
  .post((req: NextApiRequest, res: NextApiResponse) => {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    })

    // make it available to httpUploadProgress
    let io = res.socket.server.io
    let progressChannelName
    let sessionSocket
    let sockets = {}

    const originalName = req.file.originalname
    const filename = `${originalName}-${Date.now()}`

    console.log('NO SERVER: ', req.file)
    console.log(req.file.buffer)
    console.log(filename)

    const s3 = new aws.S3({
      params: { Bucket: process.env.AWS_BUCKET_NAME },
    })

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
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: req.file.buffer,
      },
    })

    upload.on('httpUploadProgress', function (progress) {
      var uploaded = parseInt((progress.loaded * 100) / progress.total)
      console.log('PROGRESSSS: ', uploaded, filename)
      // Workaround to show 100% progress only when sending the response back
      const adjustedProgress = uploaded > 10 ? uploaded - 10 : uploaded
      io.sockets.emit('updateProgress', adjustedProgress)
    })

    var promise = upload.promise()

    promise.then(
      function (data) {
        console.log('Successfully uploaded photo.')
        console.log(data)
        io.sockets.emit('updateProgress', 100)
        res.status(200).send(data)
      },
      function (error) {
        console.log(error)
        res.status(500).send(error)
      }
    )

    // res.end()
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    // mock conversion sending status of the progress
    console.log('CAIU NO GET')
    // try {
    //   if (!res.socket.server.io) {
    //     console.log(res.socket.server)
    //     console.log('*First use, starting socket.io')
    //   } else {
    //     console.log('socket.io already running')
    //     io = res.socket.server.io
    //   }
    // } catch (error) {
    //   console.lo('ERROR 2')
    //   console.log(error)
    // }
    console.log('VAI RESPONSE')
    res.status(200).send({ success: true })
  })

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
