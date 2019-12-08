import React from 'react'
import { hot } from 'react-hot-loader/root'
import NotePage from './pages/NotePage'

const App = () => {
  return (
    <div id="app">
      <NotePage />
    </div>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
