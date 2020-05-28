
const request = async (path, options) => {
  const resp = await fetch(path, options);
  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error(`Error response in request ${resp.status} ${resp.statusText}`)
  }
}

export default request