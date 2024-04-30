let oldStateSystems = []

function compareState(newStateSystems) {
  let changeStateArray = []

  // Проходим по данным пинов ардуино
  newStateSystems.forEach((newState) => {
    // Ищем индекс старого состояния пина
    const oldStateIndex = oldStateSystems.findIndex((state) => state.pin === newState.pin)

    if (oldStateIndex !== -1) {
      // Если нашли старое состояние
      let oldState = oldStateSystems[oldStateIndex]

      // Сравниваем старое и новое состояние и если изменилось, то в массив изменений
      if (oldState.state !== newState.state) {
        console.log(
          `Состояние Pin ${newState.pin} подразделение ${newState.subunit} изменилось с ${oldState.state} на ${newState.state}`
        )
        changeStateArray.push(newState)
      }

      // Обновляем старое состояние
      oldStateSystems[oldStateIndex] = newState
    } else {
      // Если старое состояние не найдено, добавляем новое состояние в список
      oldStateSystems.push(newState)
    }
  })

  // Возвращаем массив изменений, если они были
  return changeStateArray.length > 0 ? changeStateArray : null
}

export { compareState }
