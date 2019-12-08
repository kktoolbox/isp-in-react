import React, { createContext, useEffect, useState } from 'react'
import { NoteProps } from '../components/NoteCard'
import NoteCollectionComponent from '../components/NoteCollection'
import { CreateCardEvent } from '../components/NoteCreationForm'
import { fetchNotes, NoteDataProps } from '../utils/data'

export type DeleteNoteEvent = (props: {
  id: string
  onSuccess?: () => void
  onError?: (error: Error) => void
  onFinally?: () => void
}) => void

// TODO EXTRA: 6-1 create context of note
export const NoteContext = createContext<{
  handleDelete: DeleteNoteEvent | null
}>({
  handleDelete: null,
})

const NoteCollection: React.FC = () => {
  const [notesRaw, setNotesRaw] = useState<NoteDataProps[]>([])

  useEffect(() => {
    // TODO: 3-1 add fake data of notes
    setNotesRaw([])

    // TODO: 3-3 fetch notes from data API (./util/data.ts)
    fetchNotes()
  }, [])

  // TODO: 4-3 implement handle function of create note event (./util/data.ts)
  const handleCreate: CreateCardEvent = ({ values, onSuccess, onError, onFinally }) => {}

  // TODO EXTRA: 6-3 implement handle function of delete note event (use react context api)
  const handleDelete: DeleteNoteEvent = ({ id, onSuccess, onError, onFinally }) => {}

  const notes: NoteProps[] = notesRaw.map(noteRaw => ({
    id: noteRaw.id,
    lastUpdate: noteRaw.lastUpdate || 0,
    content: noteRaw.content || '',
  }))

  // TODO EXTRA: 6-2 create context provider
  return <NoteCollectionComponent notes={notes} onCreate={handleCreate} />
}

export default NoteCollection
