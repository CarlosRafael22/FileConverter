import { NextApiRequest, NextApiResponse } from 'next'
import apiHandler from '../../backend/apiHandler'

const apiRoute = apiHandler.get((req: NextApiRequest, res: NextApiResponse) => {
  // mock conversion sending status of the progress
  console.log('SERVER GET: ', req)
  res.status(200).send({ success: true })
})

export default apiRoute
