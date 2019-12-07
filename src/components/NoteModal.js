import React, { useContext, useState } from 'react'
import { Badge, Button, Modal } from 'react-bootstrap'
import { NoteContext } from '../containers/NoteCollection'

const NoteModal = ({ children, id, title, tags, content }) => {
  const { handleDelete } = useContext(NoteContext)

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="cursor-pointer" onClick={() => setVisible(true)}>
        {children}
      </div>

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>
          <div className="mb-4">
            {tags.map(tag => (
              <Badge key={tag.id} pill variant="primary" className="mr-2">
                {tag.name}
              </Badge>
            ))}
          </div>
          <div>{content}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            disabled={loading}
            onClick={() => {
              setLoading(true)

              handleDelete({
                onError: () => {
                  setLoading(false)
                },
                id,
              })
            }}
          >
            {loading ? <i className="fas fa-spinner fa-pulse" /> : <i className="fas fa-trash-alt" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NoteModal
