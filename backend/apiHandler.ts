import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import { Server } from 'socket.io'

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
// const upload = multer()
// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = multer().single('file')

// Adds the middleware to Next-Connect
// const multerUploadMiddleware = nextConnect().use(
//   '/api/upload',
//   uploadMiddleware
// )

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onError(error, req, res) {
    console.log('NO ERROR DO SERVER: ', error.message)
    console.log('REQUEST: ', req)
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiHandler.use('/api/upload', uploadMiddleware)

apiHandler.use((req, res, next) => {
  console.log('NO MIDDLEWARE DO MEIO')

  // make it available to httpUploadProgress
  let io

  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    io = new Server(res.socket.server)
    // console.log(io)

    io.on('connection', (socket) => {
      console.log('DEU CONNECTION')
      // socket.join(filename)

      socket.on('hello', (msg: string) => {
        console.log('MESSAGE: ', msg)
        socket.emit('hello', 'bora ver')
      })

      console.log('VAI MANDAR OS EMIT CARAAAAI')
      socket.emit('progress', 20)

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

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
    io = res.socket.server.io
  }

  console.log('NO SERVER: ', req.file)
  console.log(req.file.buffer)

  next()
})
// .use(multerUploadMiddleware)

export default apiHandler
