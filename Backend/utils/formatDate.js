import moment from "moment"
function formatDate(values) {
  const formatSingleDate = (date) => moment(date).locale("ru").format("DD.MM.YYYY HH:mm:ss")
  if (Array.isArray(values)) {
    const formattedDate = values.map((value) => ({
      ...value._doc,
      createdAt: formatSingleDate(value.createdAt),
      updatedAt: formatSingleDate(value.updatedAt),
    }))
    return formattedDate
  } else {
    values._doc.createdAt = formatSingleDate(values.createdAt)
    values._doc.updatedAt = formatSingleDate(values.updatedAt)
    return values
  }
}
export { formatDate }
