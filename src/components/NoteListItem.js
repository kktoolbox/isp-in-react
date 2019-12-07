import React from 'react'
import { Badge, ListGroup } from 'react-bootstrap'

const NoteListItem = ({ title, tags }) => {
  return (
    <ListGroup.Item>
      <span className="mr-4">{title}</span>

      {tags.map(tag => (
        <Badge key={tag.id} pill variant="primary" className="mr-2">
          {tag.name}
        </Badge>
      ))}
    </ListGroup.Item>
  )
}

export default NoteListItem
