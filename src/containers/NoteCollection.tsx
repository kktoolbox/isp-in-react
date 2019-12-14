import React, { createContext, useEffect, useState } from 'react'
import { NoteProps } from '../components/NoteCard'
import NoteCollectionComponent from '../components/NoteCollection'
import { CreateCardEvent } from '../components/NoteCreationForm'
import { createNote, deleteNote, fetchNotes, NoteDataProps } from '../utils/data'

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
  const [notesRaw, setnotesRaw] = useState<NoteDataProps[]>([])

  useEffect(() => {
    // TODO: 3-1 add fake data of notes
    // setNotes([
    //   {
    //     id: 'note-1576345856232',
    //     lastUpdate: 1576345856232,
    //     title: '小行星2814',
    //     categories: [
    //       {
    //         id: 'category-random',
    //         name: 'random',
    //       },
    //       {
    //         id: 'category-space',
    //         name: 'space',
    //       },
    //       {
    //         id: 'category-wiki',
    //         name: 'wiki',
    //       },
    //     ],
    //     abstract: '小行星2814（英語：2814 Vieira）是一顆圍繞太陽',
    //     content:
    //       '小行星2814（英語：2814 Vieira）是一顆圍繞太陽公轉的小行星。1982年3月18日，亨利·德波鴻諾在拉西拉天文台發現了此天體[1][2]。\n\nhttps://zh.wikipedia.org/wiki/%E5%B0%8F%E8%A1%8C%E6%98%9F2814',
    //   },
    //   {
    //     id: 'note-1576345902001',
    //     lastUpdate: 1576345902001,
    //     title: '卡西諾戰役',
    //     categories: [
    //       {
    //         id: 'category-random',
    //         name: 'random',
    //       },
    //       {
    //         id: 'category-war',
    //         name: 'war',
    //       },
    //       {
    //         id: 'category-wiki',
    //         name: 'wiki',
    //       },
    //     ],
    //     abstract: '卡西諾山戰役（也稱為「羅馬戰役」及「卡西諾戰役」）是第二次世',
    //     content:
    //       '卡西諾山戰役（也稱為「羅馬戰役」及「卡西諾戰役」）是第二次世界大戰期間盟軍為突破冬季防線發動的一系列共4場高昂代價的戰役，其目的是突進至羅馬。\n\nhttps://zh.wikipedia.org/wiki/%E5%8D%A1%E8%A5%BF%E8%AB%BE%E6%88%B0%E5%BD%B9',
    //   },
    // ])

    // TODO: 3-3 fetch notes from data API (./util/data.ts)
    fetchNotes().then(notesRaw => {
      setnotesRaw(notesRaw)
    })
  }, [])

  // TODO: 4-3 implement handle function of create note event (./util/data.ts)
  const handleCreate: CreateCardEvent = ({ values, onSuccess, onError, onFinally }) => {
    createNote({
      title: values.title,
      categories: values.categories,
      content: values.content,
    })
      .then(() => {
        fetchNotes().then(notesRaw => {
          setnotesRaw(notesRaw)
        })
        onSuccess && onSuccess()
      })
      .catch(error => onError && onError(error))
      .finally(() => onFinally && onFinally())
  }

  // TODO EXTRA: 6-3 implement handle function of delete note event (use react context api)
  const handleDelete: DeleteNoteEvent = ({ id, onSuccess, onError, onFinally }) => {
    deleteNote(id)
      .then(() => {
        fetchNotes().then(notesRaw => {
          setnotesRaw(notesRaw)
        })
        onSuccess && onSuccess()
      })
      .catch(error => onError && onError(error))
      .finally(() => onFinally && onFinally())
  }

  const notes: NoteProps[] = notesRaw.map(note => ({
    id: note.id,
    title: note.title,
    categories: note.categories.split(' ').map(category => ({
      id: `category-${category}`,
      name: category,
    })),
    content: note.content,
    abstract: note.abstract || '',
    lastUpdate: note.lastUpdate || 0,
  }))

  // TODO EXTRA: 6-2 create context provider
  return (
    <NoteContext.Provider value={{ handleDelete }}>
      <NoteCollectionComponent notes={notes} onCreate={handleCreate} />
    </NoteContext.Provider>
  )
}

export default NoteCollection
