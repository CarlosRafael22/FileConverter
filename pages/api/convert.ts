import { NextApiRequest, NextApiResponse } from 'next'
import apiHandler from '../../backend/apiHandler'
import { database } from '../../backend/firebase/firebase'

const apiRoute = apiHandler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // mock conversion sending status of the progress
  const { query: { filename } } = req
  console.log('SERVER GET: ')
  const fileRef = database.ref(`/files`).child(`${filename}`)
  const setProgressCallback = (progress: number) => fileRef.set({ conversion: progress })
  mockConversion(setProgressCallback)
  res.status(200).send({ success: true })
})

type mockCallbackType = (progress: number) => void

const mockConversion = (callback: mockCallbackType): void => {
  let progress = 0
  let progressArray = []
  while (progress < 100) {
    let incProgress = progress + Math.floor(Math.random() * 19) + 10
    progress = incProgress > 100 ? 100 : incProgress
    console.log(progress, incProgress)
    progressArray.push(progress)
  }

  progressArray.forEach((progress, index) => {
    // clearTimeout(time)
    setTimeout(() => {
      console.log('progress no timeout: ', progress)
      // socket.emit('updateProgress', progress)
      callback(progress)
    }, 1000 * index)
  })
}

export default apiRoute