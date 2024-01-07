function convertDate(dateString) {
  const date = new Date(dateString)
  let day = date.getDate().toString().padStart(2, "0")
  let month = (date.getMonth() + 1).toString().padStart(2, "0")
  let year = date.getFullYear()
  return `${day}.${month}.${year}`
}

function convertTime(dateString) {
  const date = new Date(dateString)
  let hours = date.getHours().toString().padStart(2, "0")
  let minutes = date.getMinutes().toString().padStart(2, "0")
  let seconds = date.getSeconds().toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export { convertDate, convertTime }
