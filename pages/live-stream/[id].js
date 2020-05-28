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

const fetcher = (url) => request(url, {method: 'GET'})

export default () => {
  const router = useRouter()
  const { id } = router.query
  console.log('rendering', id)
  const { data, error } = useSWR(() =>
    id ? `/api/live-stream/${id}` : null
  , fetcher)

  console.log('debug', error)
  if (error) {
    return <Layout title="Live stream page"><ErrorMessage message={error.message} /></Layout>
  }
  console.log('debug', data, error)
  return (
    <Layout title="Live stream page">
      <div>Live stream page {id}</div>
    </Layout>
  )
}