import Config from "../config/index.js"

const subunitList = Config.subunitList

function translateSubunit(subunit) {
  let foundSubunit = subunitList.find((el) => Object.keys(el)[0] === subunit)
  let foundTranslateSubunit = Object.values(foundSubunit)[0]
  return foundTranslateSubunit
}
export { translateSubunit }
