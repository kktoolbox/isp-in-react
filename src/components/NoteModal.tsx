import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { NoteContext } from '../containers/NoteCollection'
import CategoryBadge, { CategoryProps } from './CategoryBadge'

// TODO: 5-1 define props of note modal
export type NoteModalProps = {
  renderTrigger?: React.ReactNode
  id: string
  title: string
  categories: CategoryProps[]
  content: string
}

const NoteModal: React.FC<NoteModalProps> = ({ renderTrigger, id, title, categories, content }) => {
  // TODO EXTRA: 6-4 use context
  const { handleDelete } = useContext(NoteContext)

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // TODO EXTRA: 6-5 handle delete event
  const handleClick = () => {
    setLoading(true)
    handleDelete &&
      handleDelete({
        id,
        onError: () => setLoading(false),
      })
  }

  // TODO: 5-2 implement structures of note modal
  // * hints: usage of modal
  // * <NoteModal renderTrigger={<NoteCard />} />
  return (
    <>
      {renderTrigger && (
        <div className="cursor-pointer" onClick={() => setVisible(true)}>
          {renderTrigger}
        </div>
      )}

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-4">
            {categories.map(category => (
              <CategoryBadge key={category.id} {...category} />
            ))}
          </div>
          <div>{content}</div>
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
