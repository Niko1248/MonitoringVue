let oldStateSystems = null

function compareState(newStateSystems) {
  let changeStateArray = []
  if (oldStateSystems === null) {
    oldStateSystems = newStateSystems
    return
  }
  newStateSystems.forEach((newState, idx) => {
    if (oldStateSystems[idx].state !== newState.state) {
      console.log(`Состояние Pin № ${newState.pin} изменилось с ${oldStateSystems[idx].state} на ${newState.state}`)
      changeStateArray.push(newState)
    }
  })
  if (changeStateArray.length != 0) {
    oldStateSystems = newStateSystems
    return changeStateArray
  } else {
    return
  }
}
export { compareState }
