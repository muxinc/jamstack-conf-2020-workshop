//
// 1. use the shared layout
// 2. make request to the api, get the live stream details (status, stream key, etc)
// 3. If active, show a preview of the live stream in a video player
//
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import request from '../../components/request'
import Spinner from '../../components/spinner'
import ErrorMessage from '../../components/error-message'
import VideoPlayer from '../../components/video-player'

const fetcher = (url) => request(url, {method: 'GET'})

const StreamInfo = ({ stream_key, status}) => (
  <div>
    <p>stream key: {stream_key}</p>
    <p>status: {status}</p>
  </div>
)

export default () => {
  const router = useRouter()
  const { id } = router.query
  console.log('rendering', id)
  const { data, error } = useSWR(() =>
    id ? `/api/live-stream/${id}` : null
  , fetcher, { refreshInterval: 5000 })

  if (error) {
    return <Layout title="Live stream page"><ErrorMessage message={error.message} /></Layout>
  }

  if (!data) return <Layout><Spinner /></Layout>

  return (
    <Layout title="Producer page">
      <StreamInfo stream_key={data.stream_key} status={data.status} />
      <div>
        {data.status === 'active' && <VideoPlayer src={data.playback_url} />}
      </div>
    </Layout>
  )
}