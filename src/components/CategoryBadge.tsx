import React from 'react'
import { Badge } from 'react-bootstrap'

// TODO: 1-1 define props of category
export type CategoryProps = {
  id: string
  name: string
}

// TODO: 1-2 extend types of funcitonal component
const CategoryBadge: React.FC<CategoryProps> = ({ id, name }) => {
  // TODO: 1-3 implement structures of category badge
  return (
    <Badge variant="primary" className="mr-2">
      {name}
    </Badge>
  )
}

export default CategoryBadge
