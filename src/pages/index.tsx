import { navigate } from "gatsby"
import { useEffect } from "react"

const Index = () => {
  useEffect(() => {
    navigate("/app/")
  }, [])
  return null
}

export default Index
