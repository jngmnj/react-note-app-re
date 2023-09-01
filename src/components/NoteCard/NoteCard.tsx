import React from 'react'
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles'
import { useAppDispatch } from '../../hooks/redux';
import { Note } from '../../types/note';
import { NotesIconBox } from '../../styles/styles';
import { readNote, setPinnedNotes } from '../../store/notesList/notesListSlice';
import { BsFillPinFill } from 'react-icons/bs';
import getRelevantBtns from './../../../../react-note-app/src/utils/getRelevantBtns';

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } = note;
  const dispatch = useAppDispatch();

  return (
    <Card>
      <TopBox>
        <div className="noteCard__title">
          {title.length > 10 ? title.slice(0, 10) + "..." : title}
        </div>
        <div className='noteCard__top-options'>
          <span className='noteCard__priority'>{priority}</span>
          {type !== "archive" && type !== "trash" && (
            <NotesIconBox
              className='noteCard__pin'
              onClick={() => dispatch(setPinnedNotes({ type, id }))}
            >
              <BsFillPinFill style={{color: isPinned ? "red" : ""}}/>
            </NotesIconBox>
          )}
        </div>
      </TopBox>
      <ContentBox onClick={() => dispatch(readNote({ type, note }))}>
        {content}
      </ContentBox>
      <TagsBox>
        {tags.map(({ tag, id}) => (
          <span key={id}>{tag}</span>
        ))}
      </TagsBox>
      <FooterBox>
        <div className='noteCard__date'>{date}</div>
        <div>{getRelevantBtns(type, note, dispatch)}</div>
      </FooterBox>
    </Card>
  );
};

export default NoteCard