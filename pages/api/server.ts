import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import aws from 'aws-sdk'
import { Server } from 'socket.io'

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer()

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single('file')

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware)

apiRoute
  .post((req: NextApiRequest, res: NextApiResponse) => {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    })

    // make it available to httpUploadProgress
    let io
    let progressChannelName
    let sessionSocket
    let sockets = {}

    const originalName = req.file.originalname
    const filename = `${originalName}-${Date.now()}`
    // console.log(' RES NO SERVER: ', res, res.socket)

    if (!res.socket.server.io) {
      console.log('*First use, starting socket.io')

      io = new Server(res.socket.server)
      // console.log(io)

      io.on('connection', (socket) => {
        console.log('DEU CONNECTION')
        // socket.broadcast.emit('a user connected')
        socket.join(filename)

        sessionSocket = socket
        // console.log('sessionSocket: ', sessionSocket)

        socket.on('hello', (msg) => {
          console.log('MESSAGE: ', msg)
          socket.emit('hello', 'bora ver')
        })

        console.log('VAI MANDAR OS EMIT CARAAAAI')
        sessionSocket.emit('progress', 10)
        socket.emit('progress', 20)
      })

      res.socket.server.io = io
    } else {
      console.log('socket.io already running')
      io = res.socket.server.io
    }

    console.log('NO SERVER: ', req.file)
    console.log(req.file.buffer)
    console.log(filename)

    const s3 = new aws.S3({
      params: { Bucket: process.env.AWS_BUCKET_NAME },
    })

    console.log('VAI MANDAR OS EMIT')
    try {
      console.log(res.socket.server.io)
      console.log('1111111111')
      res.socket.server.io.sockets.emit('hello', 'there')
      console.log('22222222222')
      res.socket.server.io.emit('progress', 40)
      console.log('333333333333')
      io.sockets.emit('progress', 50)
      console.log('4444444444444')
      io.emit('progress', 60)
    } catch (error) {
      console.log('ERROR: ', error)
    }

    // sockets[req.query.socket].emit('updateProgress', 10)

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
      // res.socket.server.io.to(filename).emit('progress', uploaded)
      // console.log('sessionSocket: ', sessionSocket)
      io.sockets.emit('updateProgress', uploaded)
      // sockets[req.query.socket].emit('updateProgress', uploaded)
    })

    var promise = upload.promise()

    promise.then(
      function (data) {
        console.log('Successfully uploaded photo.')
        console.log(data)
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
    try {
      if (!res.socket.server.io) {
        console.log(res.socket.server)
        console.log('*First use, starting socket.io')

        try {
          const io = new Server(res.socket.server)
          io.on('connection', (socket) => {
            socket.on('convert', (data: any) => {
              console.log('RECEIVED CONVERT REQUEST')
              // socket.emit('updateProgress', 10)
              // socket.emit('convert', 100)
              let progress = 0
              let progressArray = []
              while (progress < 100) {
                let incProgress = progress + Math.floor(Math.random() * 19) + 10
                progress = incProgress > 100 ? 100 : incProgress
                console.log(progress, incProgress)
                progressArray.push(progress)
              }

              console.log(progressArray)
              // const delayEmit = () => {

              // }
              progressArray.forEach((progress, index) => {
                // clearTimeout(time)
                setTimeout(() => {
                  console.log('progress no timeout: ', progress)
                  socket.emit('updateProgress', progress)
                }, 1000 * index)
              })
            })
          })
        } catch (error) {
          console.log('ERROR NO SERVER')
          console.log(error)
        }
      } else {
        console.log('socket.io already running')
        io = res.socket.server.io
      }
    } catch (error) {
      console.lo('ERROR 2')
      console.log(error)
    }

    res.status(200).send({ success: true })
  })

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
