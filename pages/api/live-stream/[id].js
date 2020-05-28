import Mux from '@mux/mux-node'
const { Video } = new Mux()

export default async function liveStreamHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const liveStream = await Video.LiveStreams.get(req.query.id)
        res.json({
          status: liveStream.status,
          stream_key: liveStream.stream_key
        })
      } catch (e) {
        res.statusCode = 500
        console.error('Request error', e)
        res.json({ error: 'Error getting upload/asset' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}