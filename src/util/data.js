export const fetchNotes = () => {
  try {
    return JSON.parse(localStorage.getItem('notes') || '[]')
  } catch (error) {
    process.env.NODE_ENV === 'development' && console.error(error)
    return []
  }
}

export const createNote = values => {
  const timestamp = Date.now()

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const notes = fetchNotes()

        notes.push({
          id: `note-${timestamp}`,
          lastUpdate: timestamp,
          title: values.title,
          tags: values.tags,
          abstract: values.content.slice(0, 30),
          content: values.content,
        })

        localStorage.setItem('notes', JSON.stringify(notes))

        resolve('200 ok')
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

export const updateNote = values => {
  const timestamp = Date.now()

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const notes = fetchNotes()

      const targetIndex = notes.findIndex(note => note.id === values.id)

      if (targetIndex === -1) {
        reject(new Error('target not found'))
      }

      notes[targetIndex] = {
        ...notes[targetIndex],
        ...values,
        lastUpdate: timestamp,
      }

      localStorage.setItem('notes', JSON.stringify(notes))

      resolve('200 ok')
    }, 2000)
  })
}

export const deleteNote = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const notes = fetchNotes().filter(note => note.id !== id)

        localStorage.setItem('notes', JSON.stringify(notes))

        resolve('200 ok')
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}
