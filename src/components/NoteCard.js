import React from 'react'
import { Badge, Card } from 'react-bootstrap'

const NoteCard = ({ title, tags, abstract }) => {
  return (
    <Card className="cursor-pointer">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Subtitle className="mb-2">
          {tags.map(tag => (
            <Badge key={tag.id} pill variant="primary" className="mr-2">
              {tag.name}
            </Badge>
          ))}
        </Card.Subtitle>

        <span>{abstract}</span>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
