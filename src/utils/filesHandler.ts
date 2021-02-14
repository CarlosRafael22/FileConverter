import axios from 'axios'

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
    onUploadProgress: (event) => {
      const currentProgress = Math.round((event.loaded * 100) / event.total)
      console.log(`Current progress:`, currentProgress)
      onProgressHandler(currentProgress)
    },
  }

  const response = await axios.post('/api/server', formData, config)
  console.log('response', response.data)
}

export const uploadFiles = (
  files: Array<any>,
  onProgressHandler: onProgressHandlerType
) => {
  const formData = createFormDataFromFiles(files)
  sendData(formData, onProgressHandler)
}
