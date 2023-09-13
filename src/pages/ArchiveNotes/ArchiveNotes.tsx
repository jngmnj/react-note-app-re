import React from 'react'
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { Container, EmptyMsgBox } from "../../styles/styles";

const ArchiveNotes = () => {
  const { state } = useLocation();
  const { trashNotes } = useAppSelector((state) => state.notesList);

  return (
    <Container>
      {trashNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <>
          <MainWrapper notes={trashNotes} type={state} />
        </>
      )}
    </Container>
  );
}

export default ArchiveNotes