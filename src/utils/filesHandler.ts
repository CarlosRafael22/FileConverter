import axios from 'axios'
// import { io } from 'socket.io-client'
import { database } from '../firebase'

export const INPUTNAME = 'file'

type onProgressHandlerType = (progress: number) => void

const createFormDataFromFiles = (files: FileList) => {
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
    // onUploadProgress: (event: any) => {
    //   const currentProgress = Math.round((event.loaded * 100) / event.total)
    //   // onProgressHandler(currentProgress)
    // },
  }

  const originalName = formData.get('file').name.split('.')[0]
  const filename = `${originalName}-${Date.now()}`
  const databaseRef = database.ref('/files').child(filename)
  databaseRef.on("child_changed", function(snapshot: any) {
    const updatedProgress = snapshot.val()
    onProgressHandler(updatedProgress)
  });
  
  await axios.post(`/api/upload?filename=${filename}`, formData, config)
}

export const convertFiles = async (
  format: string,
  onProgressHandler: onProgressHandlerType
) => {
  const filename = `${format}-${Date.now()}`
  const databaseRef = database.ref('/files').child(filename)
  databaseRef.on("child_changed", function(snapshot: any) {
    const updatedProgress = snapshot.val()
    onProgressHandler(updatedProgress)
  });

  try {
    await axios.get(`/api/convert?filename=${filename}`)
  } catch (error) {
    console.log('ERROR CONVERT: ', error)
  }
}

export const uploadFiles = (
  files: FileList,
  onProgressHandler: onProgressHandlerType
) => {
  const formData = createFormDataFromFiles(files)
  sendData(formData, onProgressHandler)
}
