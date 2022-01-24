import gql from 'graphql-tag'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/**
 * The type `AvatarExampleFragment` in automatically generated.
 * The document can be passed to any graphql client.
 *
 * @example
 * import { AvatarExampleFragment } from './generated/graphql'
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvatarExampleFragmentDocument = gql`
  fragment AvatarExample on Avatar {
    smallUrl
    largeUrl
    xLargeUrl
  }
`

const mountingPoint = document.getElementById('root')

if (mountingPoint == null) {
  throw new Error(
    'The mounting point of the application was not found. Please make sure an element with `id="root"` exist in index.html.'
  )
}

ReactDOM.render(<App />, mountingPoint)
