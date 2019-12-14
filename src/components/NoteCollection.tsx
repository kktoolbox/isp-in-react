import React from 'react'
import NoteCard, { NoteProps } from './NoteCard'
import NoteCreationForm, { CreateCardEvent } from './NoteCreationForm'
import NoteModal from './NoteModal'

const NoteCollection: React.FC<{
  notes: NoteProps[]
  onCreate?: CreateCardEvent
}> = ({ notes, onCreate }) => {
  return (
    <div className="row py-5">
      {/* // TODO: 3-2 use NoteCard to display notes */}
      <div className="col-6">
        {notes.map(note => (
          <div key={note.id} className="mb-4">
            <NoteModal {...note} renderTrigger={<NoteCard {...note} />} />
          </div>
        ))}
      </div>

      <div className="col-6">
        <NoteCreationForm onCreate={onCreate} />
      </div>
    </div>
  )
}

export default NoteCollection
