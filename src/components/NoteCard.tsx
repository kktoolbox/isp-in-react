import React from 'react'
import { Card } from 'react-bootstrap'
import CategoryBadge, { CategoryProps } from './CategoryBadge'

// TODO: 2-1 define props of note
export type NoteProps = {
  id: string
  lastUpdate: number
  content: string

  title: string
  categories: CategoryProps[]
  abstract: string
}

// TODO: 2-2 extend types of functional component
const NoteCard: React.FC<NoteProps> = ({ title, categories, abstract }) => {
  // TODO: 2-3 implement structures of note card
  // * hint: use CategoryBadge to display categories
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="mb-4">
          {categories.map(category => (
            <CategoryBadge key={category.id} id={category.id} name={category.name} />
          ))}
        </div>
        <Card.Text>{abstract}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
