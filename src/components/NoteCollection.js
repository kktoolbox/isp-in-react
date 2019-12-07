import React, { useState } from 'react'
import { Col, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import NoteAdminModal from './NoteAdminModal'
import NoteCard from './NoteCard'
import NoteListItem from './NoteListItem'
import NoteModal from './NoteModal'

const NoteCollection = ({ notes, onSubmit }) => {
  const [activeKey, setActiveKey] = useState('list') // list-group, cards

  return (
    <>
      <div className="mb-5">
        <NoteAdminModal triggerText="New Note" onSubmit={onSubmit} />
      </div>

      <Tabs id="controlled-tab-example" activeKey={activeKey} onSelect={key => setActiveKey(key)}>
        <Tab eventKey="list" title="List" className="py-4">
          <ListGroup>
            {notes.map(note => (
              <NoteModal key={note.id} {...note}>
                <NoteListItem {...note} />
              </NoteModal>
            ))}
          </ListGroup>
        </Tab>
        <Tab eventKey="card" title="Card" className="py-4">
          <Row>
            {notes.map(note => (
              <Col key={note.id} xs={12} md={6} lg={4} className="mb-3">
                <NoteModal key={note.id} {...note}>
                  <NoteCard {...note} />
                </NoteModal>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </>
  )
}

export default NoteCollection
