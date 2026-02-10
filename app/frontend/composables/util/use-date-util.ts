export function useDateUtil() {
  const isValidDate = (str: string):boolean => {
    return !isNaN(Date.parse(str))
  }

  return { isValidDate }
}
