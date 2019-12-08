import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { NoteContext } from '../containers/NoteCollection'

// TODO: 5-1 define props of note modal
export type NoteModalProps = {
  renderTrigger?: React.ReactNode
  id: string
}

const NoteModal: React.FC<NoteModalProps> = ({ renderTrigger, id }) => {
  // TODO EXTRA: 6-4 use context
  const { handleDelete } = useContext(NoteContext)

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // TODO EXTRA: 6-5 handle delete event
  const handleClick = () => {}

  // TODO: 5-2 implement structures of note modal
  // * hints: usage of modal
  // * <NoteModal renderTrigger={<NoteCard />} />
  return (
    <>
      {renderTrigger && <div onClick={() => setVisible(true)}>{renderTrigger}</div>}

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-4">categories</div>
          <div>content</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={handleClick}>
            {loading ? <i className="fas fa-spinner fa-pulse" /> : <i className="fas fa-trash-alt" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NoteModal
