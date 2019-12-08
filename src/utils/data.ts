export type NoteDataProps = {
  id: string
  title: string
  tags: string
  content: string
  abstract?: string
  lastUpdate?: number
}

export const fetchNotes: () => Promise<NoteDataProps[]> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const notes: NoteDataProps[] = JSON.parse(localStorage.getItem('notes') || '[]') as NoteDataProps[]
        resolve(notes)
      } catch (error) {
        console.error(error)
        resolve([])
      }
    }, 1000)
  })
}

export const createNote: (values: { title: string; tags: string; content: string }) => Promise<string> = ({
  title,
  tags,
  content,
}) => {
  const timestamp = Date.now()

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      try {
        const notes: NoteDataProps[] = JSON.parse(localStorage.getItem('notes') || '[]') as NoteDataProps[]

        notes.push({
          id: `note-${timestamp}`,
          title: title,
          tags: tags,
          abstract: content.slice(0, 30),
          content: content,
          lastUpdate: timestamp,
        })

        localStorage.setItem('notes', JSON.stringify(notes))

        resolve('200 ok')
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

export const updateNote: (values: {
  id: string
  title?: string
  tags?: string
  content?: string
}) => Promise<string> = ({ id, title, tags, content }) => {
  const timestamp = Date.now()

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const notes: NoteDataProps[] = JSON.parse(localStorage.getItem('notes') || '[]') as NoteDataProps[]

      const targetIndex = notes.findIndex(note => note.id === id)

      if (targetIndex === -1) {
        reject(new Error('target not found'))
      }

      notes[targetIndex] = {
        id,
        title: title || notes[targetIndex].title,
        tags: tags || notes[targetIndex].tags,
        content: content || notes[targetIndex].content,
        lastUpdate: timestamp,
      }

      localStorage.setItem('notes', JSON.stringify(notes))

      resolve('200 ok')
    }, 2000)
  })
}

export const deleteNote: (id: string) => Promise<string> = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const notes: NoteDataProps[] = (JSON.parse(localStorage.getItem('notes') || '[]') as NoteDataProps[]).filter(
          note => note.id !== id,
        )

        localStorage.setItem('notes', JSON.stringify(notes))

        resolve('200 ok')
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}
