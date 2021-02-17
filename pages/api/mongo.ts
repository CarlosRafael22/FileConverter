import { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../backend/mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { client, db } = await connectToDatabase()

  // const isConnected = await client.isConnected()
  // console.log(isConnected, db)

  // const response = await db.collection('files').insertOne({
  //   name: 'file1',
  //   size: 123,
  // })
  console.log(req)

  // res.status(200).json(response.ops[0])
  res.status(200).json({ success: true })
}
