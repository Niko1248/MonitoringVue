export default function (dateString) {
  if (!dateString) {
    var date = new Date()
  } else {
    var date = new Date(dateString)
  }
  let hours = date.getHours().toString().padStart(2, '0')
  let minutes = date.getMinutes().toString().padStart(2, '0')
  let seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
