import { WrapRootElementBrowserArgs } from "gatsby"
import React from "react"
import { Provider } from "react-redux"
import store from "./store"

const ReduxWrapper: React.FC<WrapRootElementBrowserArgs> = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}

export default ReduxWrapper
