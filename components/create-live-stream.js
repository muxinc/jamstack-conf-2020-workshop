import { useState } from 'react'
import Button from './button'
import Spinner from './spinner'
import ErrorMessage from './error-message'

export default () => {
  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const createLiveStream = async () => {
    setIsCreating(true)
    // make an api request to the backend
    // backend talks to Mux
    // get a response
    // POST /api/live-stream
    try {
      let resp = await fetch('/api/live-stream', {method: 'POST'})
      resp = await resp.json()
      console.log('debug resp', resp)
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