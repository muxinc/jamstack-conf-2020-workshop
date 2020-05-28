import Button from './button'

export default () => {
  const createLiveStream = () => {
    console.log('debug createLiveStream click')
  }

  return (
    <Button onClick={createLiveStream}>Create live stream</Button>
  )
}