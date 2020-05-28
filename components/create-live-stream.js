import { useState } from 'react'
import Button from './button'
import Spinner from './spinner'
import ErrorMessage from './error-message'
import request from './request'

export default () => {
  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const createLiveStream = async () => {
    setIsCreating(true)
    try {
      const resp = await request('/api/live-stream', {method: 'POST'})
      console.log('resp', resp)
    } catch (e) {
      console.error('Error creating live stream', e)
      setErrorMessage('Error creating live stream')
    }
  }

  if (errorMessage) return <ErrorMessage message={errorMessage} />

  return isCreating ?
  <Spinner /> :
  <Button onClick={createLiveStream}>Create live stream</Button>
}