import React from 'react'
import { NotesContainer } from '../styles/styles'
import NoteCard from '../components/NoteCard/NoteCard'

const getAllNotes = (mainNotes, filter) => {
  return (
    <>
        <div className='allNotes__notes-type'>
            <span>note type</span>
        </div>
        <NotesContainer>
            {mainNotes.map((note) => (
                <NoteCard key={note.id} note={note} type="notes" />
            ))}
        </NotesContainer>
    </>
  )
}

export default getAllNotes