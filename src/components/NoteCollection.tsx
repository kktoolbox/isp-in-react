import React from 'react'
import { NoteProps } from './NoteCard'
import NoteCreationForm, { CreateCardEvent } from './NoteCreationForm'

const NoteCollection: React.FC<{
  notes: NoteProps[]
  onCreate?: CreateCardEvent
}> = ({ notes, onCreate }) => {
  return (
    <div className="row py-5">
      {/* // TODO: 3-2 use NoteCard to display notes */}
      <div className="col-6"></div>

      <div className="col-6">
        <NoteCreationForm onCreate={onCreate} />
      </div>
    </div>
  )
}

export default NoteCollection
