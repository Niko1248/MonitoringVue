export default function (token) {
  try {
    const codePayload = token.split('.')[1]
    const decodedPayload = atob(codePayload)
    return JSON.parse(decodedPayload)
  } catch (e) {
    console.log(e)
    return null
  }
}
