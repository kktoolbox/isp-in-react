import React, { createContext, useEffect, useState } from 'react'
import NoteCollectionComponent from '../components/NoteCollection'
import { createNote, deleteNote, fetchNotes } from '../util/data'

export const NoteContext = createContext({
  handleDelete: null,
})

const NoteCollection = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(fetchNotes())
  }, [])

  const handleSubmit = ({ onSuccess, onError, onFinally, values }) => {
    createNote(values)
      .then(body => {
        setNotes(fetchNotes())
        onSuccess && onSuccess(body)
      })
      .catch(error => onError && onError(error))
      .finally(() => onFinally && onFinally())
  }

  const handleDelete = ({ onSuccess, onError, onFinally, id }) => {
    deleteNote(id)
      .then(body => {
        setNotes(fetchNotes())
        onSuccess && onSuccess(body)
      })
      .catch(error => onError && onError(error))
      .finally(() => onFinally && onFinally())
  }

  return (
    <NoteContext.Provider value={{ handleDelete }}>
      <NoteCollectionComponent
        notes={notes
          .sort((a, b) => b.lastUpdate - a.lastUpdate)
          .map(note => ({
            ...note,
            tags: note.tags
              .split(' ')
              .sort()
              .map((name, index) => ({
                id: `${name}-${index}`,
                name,
              })),
          }))}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </NoteContext.Provider>
  )
}

export default NoteCollection
