import React from 'react'
import { Container } from 'react-bootstrap'
import NoteCollection from '../containers/NoteCollection'

const NotePage = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-5">
        <i className="fas fa-book mr-2" />
        <span>Notebook</span>
      </h1>

      <NoteCollection />
    </Container>
  )
}

export default NotePage
