import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { Container, EmptyMsgBox } from "../../styles/styles";
import { useLocation } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { Note } from "../../types/note";

const Notes = () => {
  const { state } = useLocation();

  let notes: Note[] = [];
  if(state.toLowerCase() === "trash") {
    const { trashNotes } = useAppSelector((state) => state.notesList);
    notes = [...trashNotes]
  } else if (state.toLowerCase() === "archive") {
    const { archiveNotes } = useAppSelector((state) => state.notesList);
    notes = [...archiveNotes];
  }

  return (
    <Container>
      {notes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <>
          <MainWrapper notes={notes} type={state.toLowerCase()} />
        </>
      )}
    </Container>
  );
};

export default Notes;
