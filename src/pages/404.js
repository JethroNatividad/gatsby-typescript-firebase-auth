import { useEffect } from "react"
import { navigate } from "gatsby"

const NotFoundPage = () => {
  useEffect(() => {
    navigate("/app")
  }, [])
  return null
}

export default NotFoundPage
