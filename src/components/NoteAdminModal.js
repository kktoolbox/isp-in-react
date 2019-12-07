import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const NoteAdminModal = ({ triggerText, onSubmit }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const formRef = useRef(null)
  const inputTitleRef = useRef(null)
  const inputTagsRef = useRef(null)
  const inputContentRef = useRef(null)

  const handleSubmit = () => {
    setLoading(true)

    onSubmit &&
      onSubmit({
        onSuccess: () => {
          formRef.current.reset()
          setLoading(false)
          setVisible(false)
        },
        onError: error => {
          setLoading(false)
          console.error(error)
        },
        values: {
          title: inputTitleRef.current.value,
          tags: inputTagsRef.current.value,
          content: inputContentRef.current.value,
        },
      })
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>{triggerText}</Button>

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header>{triggerText}</Modal.Header>

        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group controlId="note-title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={inputTitleRef} type="text" />
            </Form.Group>

            <Form.Group controlId="note-tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control ref={inputTagsRef} type="text" />
            </Form.Group>

            <Form.Group controlId="note-content">
              <Form.Label>Content</Form.Label>
              <Form.Control ref={inputContentRef} as="textarea" rows="5" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button variant="primary" disabled={loading} onClick={() => handleSubmit()}>
            {loading ? <i className="fas fa-spinner fa-pulse" /> : 'Confirm'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NoteAdminModal
