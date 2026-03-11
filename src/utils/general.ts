export function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }

  return arr1.every((element, index) => {
    return element === arr2[index]
  })
}
