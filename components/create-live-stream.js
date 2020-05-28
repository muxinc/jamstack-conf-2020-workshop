import { useState } from 'react'
import Button from './button'
import Spinner from './spinner'

export default () => {
  const [isCreating, setIsCreating] = useState(false)

  const createLiveStream = () => {
    setIsCreating(true)
    // make an api request to the backend
    // backend talks to Mux
    // get a response
    console.log('debug createLiveStream click')
  }

  return isCreating ?
  <Spinner /> :
  <Button onClick={createLiveStream}>Create live stream</Button>
}