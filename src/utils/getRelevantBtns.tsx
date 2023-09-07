import React from 'react'
import { Note } from '../types/note'
import { Dispatch } from '@reduxjs/toolkit'
import { NotesIconBox } from '../styles/styles'
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { unArchiveNote } from '../store/notesList/notesListSlice';

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {
    if(type === "archive") {
        return (
            <NotesIconBox
                onClick={() => dispatch(unArchiveNote(note))}
            >
                <RiInboxUnarchiveFill style={{ fontSize: '1rem'}}/>
            </NotesIconBox>
        )
    }
}

export default getRelevantBtns