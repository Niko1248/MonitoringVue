export default function (subunit, subunitList) {
  const findItem = subunitList.findIndex((item) => Object.keys(item)[0] === subunit)
  return Object.values(subunitList[findItem])[0]
}
