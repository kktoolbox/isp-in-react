import React, { useRef, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

export type CreateCardEvent = (props: {
  values: {
    title: string
    categories: string // ! warning: this is a string
    content: string
  }
  onSuccess?: () => void
  onError?: (error: Error) => void
  onFinally?: () => void
}) => void

const NoteCreationForm: React.FC<{
  onCreate?: CreateCardEvent
}> = ({ onCreate }) => {
  const formRef = useRef<Form<'form'> & HTMLFormElement>(null)
  const titleInputRef = useRef<FormControl<'input'> & HTMLInputElement>(null)
  const categoriesInputRef = useRef<FormControl<'input'> & HTMLInputElement>(null) // ! warning: this is a text input
  const contentTextAreaRef = useRef<FormControl<'textarea'> & HTMLTextAreaElement>(null)

  const [loading, setLoading] = useState<boolean>(false)

  // TODO: 4-2 implement handle function of form submit event
  // * hint:
  // * * <form ref={formRef} />
  // * * formRef.current.reset()
  const handleSubmit = () => {
    setLoading(true)

    onCreate &&
      onCreate({
        values: {
          title: !!titleInputRef.current ? titleInputRef.current.value : '',
          categories: !!categoriesInputRef.current ? categoriesInputRef.current.value : '',
          content: !!contentTextAreaRef.current ? contentTextAreaRef.current.value : '',
        },
        onSuccess: () => {
          !!formRef.current && formRef.current.reset()
        },
        onError: error => {
          console.error(error)
        },
        onFinally: () => {
          setLoading(false)
        },
      })
  }

  // TODO: 4-1 implement structures of note creation form
  // * hint: React Bootstrap Forms
  // * <Form /> <Form.Group />, <Form.Label />, <Form.Control />
  return (
    <Form ref={formRef}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control ref={titleInputRef} placeholder="title" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control ref={categoriesInputRef} placeholder="category" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control ref={contentTextAreaRef} placeholder="content" as="textarea" rows={5} />
      </Form.Group>

      <div className="text-right">
        <Button variant="primary" disabled={loading} onClick={() => handleSubmit()}>
          {loading ? <i className="fas fa-spinner fa-pulse" /> : 'Create'}
        </Button>
      </div>
    </Form>
  )
}

export default NoteCreationForm
