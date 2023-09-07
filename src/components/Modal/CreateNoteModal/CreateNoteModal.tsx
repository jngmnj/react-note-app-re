import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, TopBox } from './CreateNoteModal.styles';
import { FaTimes } from 'react-icons/fa';
import { toggleCreateNoteModal } from '../../../store/modal/modalSlice';

const CreateNoteModal = () => {
  const dispatch = useAppDispatch();

  const { editNote } = useAppSelector((state) => state.notesList);
  const { viewAddTagsModal } = useAppSelector((state) => state.modal);

  const closeCreateModal = () => {
    dispatch(toggleCreateNoteModal(false));
    dispatch(set)
  }
  const tagsHandler = () => {
    console.log("태그핸들러")
  };
  return (
    <FixedContainer>
      {viewAddTagsModal && <TagsModal type='add' addedTags={addedTags} handleTags={tagsHandler} />}
      <Box>
        <TopBox>
          <div className="createNote_title">노트 생성하기</div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={closeCreateModal}
          >
            <FaTimes />
          </DeleteBox>
        </TopBox>
      </Box>
    </FixedContainer>
  )
}

export default CreateNoteModal