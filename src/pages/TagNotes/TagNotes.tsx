import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Container, EmptyMsgBox } from '../../styles/styles';
import { useParams } from 'react-router-dom';
import MainWrapper from '../../components/MainWrapper/MainWrapper';
import { Note } from '../../types/note';

const TagNotes = () => {
  const { name } = useParams() as {name: string};

  const { mainNotes } = useAppSelector((state) => state.notesList);

  let notes: Note[] = [];
  // tags중에서 tag가 포함된것만
  mainNotes.forEach((note) => {
    if (note.tags.find(({ tag }) => tag === name)) {
      notes.push(note);
    }
  });

  return (
    <Container>
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <>
          <MainWrapper notes={notes} type={name} />
        </>
      )}
    </Container>
  );
}

export default TagNotes