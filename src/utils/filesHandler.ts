import axios from 'axios'

export const INPUTNAME = 'file'

const createFormDataFromFiles = (files: Array<any>) => {
  const formData = new FormData()

  Array.from(files).forEach((file) => {
    formData.append(INPUTNAME, file)
  })

  return formData
}

const sendData = async (formData) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      )
    },
  }

  const response = await axios.post('/api/server', formData, config)

  console.log('response', response.data)
}

export const uploadFiles = (files: Array<any>) => {
  const formData = createFormDataFromFiles(files)
  sendData(formData)
}
