import { useState } from "react"

export default function useReferrerManager() {
  const [referrerArray, setReferrer] = useState([])

  const updateReferrer = (url) => {
    setReferrer([...referrerArray, url])
  }
  const getLatestReferrer = () => {
    return referrerArray[referrerArray.length - 1]
  }

  return {
    referrer: getLatestReferrer(),
    updateReferrer,
  }
}
