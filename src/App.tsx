import React from 'react'
import NoteCollection from './containers/NoteCollection'

const App: React.FC = () => {
  return (
    <div className="container py-5" id="App">
      <h1 className="mb-5">
        <i className="fas fa-book mr-2" />
        <span>Note Book</span>
      </h1>

      <NoteCollection />
    </div>
  )
}

export default App
