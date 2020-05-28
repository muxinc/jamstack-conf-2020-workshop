import Mux from '@mux/mux-node'
const { Video } = new Mux()

export default async function liveStreamHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        // make an api call to mux to creat a live stream
        const liveStream = await Video.LiveStreams.create({
          playback_policy: 'public',
          new_asset_settings: { playback_policy: 'public' }
         });
         res.json({
           id: liveStream.id
         })
      } catch (e) {
        res.statusCode = 500
        console.error('Request error', e)
        res.json({ error: 'Error creating upload' })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}