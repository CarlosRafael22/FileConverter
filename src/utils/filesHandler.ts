import axios from 'axios'
import * as io from 'socket.io-client'

export const INPUTNAME = 'file'

type onProgressHandlerType = (progress: number) => void

const createFormDataFromFiles = (files: Array<any>) => {
  const formData = new FormData()

  Array.from(files).forEach((file) => {
    formData.append(INPUTNAME, file)
  })

  return formData
}

const sendData = async (
  formData: any,
  onProgressHandler: onProgressHandlerType
) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event: any) => {
      const currentProgress = Math.round((event.loaded * 100) / event.total)
      console.log(`Current progress:`, currentProgress)
      // onProgressHandler(currentProgress)
    },
  }

  const socket = io()
  // let socketId
  console.log('SOCKEETTT ', socket)
  // console.log('filename: ', formData.file.name)
  console.log('formData: ', formData.get('file'))
  // console.log('files: ', formData.files)
  // const filename = formData.get(INPUTNAME).name
  // const fileChannel = `${filename}-${Date.now()}`

  socket.on('connect', () => {
    console.log('connect')
    socket.emit('hello')
    // socket.emit('join', { name: fileChannel })
  })

  socket.on('progress', (data: number) =>
    console.log('PROGRESSO DO SOCKET: ', data)
  )
  socket.on('updateProgress', (currentProgress: number) => {
    console.log('UPDATE PROGRESSO DO SOCKETTTTTTTTTTTT: ', currentProgress)
    onProgressHandler(currentProgress)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })

  const response = await axios.post('/api/upload', formData, config)
  // const response = await axios.post('/api/upload', formData, config)
  console.log('response', response.data)
}

export const convertFiles = async (
  format: string,
  onProgressHandler: onProgressHandlerType
) => {
  const socket = io()
  console.log('VAI CONVERTER')
  socket.on('connect', () => {
    console.log('connect to convert')
    socket.emit('convert')
    // socket.emit('join', { name: fileChannel })
  })
  socket.on('updateProgress', (currentProgress: number) => {
    console.log('UPDATE PROGRESSO DO SOCKETTTTTTTTTTTT: ', currentProgress)
    onProgressHandler(currentProgress)
  })
  // socket.on('convert', (currentProgress) => {
  //   console.log('UPDATE PROGRESSO DO CONVERT: ', currentProgress)
  //   onProgressHandler(currentProgress)
  // })
  console.log(format)
  try {
    await axios.get('/api/convert')
  } catch (error) {
    console.log('ERROR NO GET DO CONVERT: ', error)
  }
}

export const uploadFiles = (
  files: Array<any>,
  onProgressHandler: onProgressHandlerType
) => {
  const formData = createFormDataFromFiles(files)
  sendData(formData, onProgressHandler)
}
