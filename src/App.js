import React from 'react'
import { hot } from 'react-hot-loader/root'

const App = () => {
  return <div id="app"></div>
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
