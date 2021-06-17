import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

const getTitleQuery = graphql`
  query getTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const IndexPage = () => {
  const data = useStaticQuery(getTitleQuery)
  return (
    <Layout>
      <p>YO</p>
    </Layout>
  )
}

export default IndexPage
