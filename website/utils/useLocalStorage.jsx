import { useState, useEffect } from "react"

const useLocalStorage = (name) => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(localStorage.getItem(name))
  }, [])

  return value
}

export default useLocalStorage