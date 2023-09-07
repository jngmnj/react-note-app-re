import React from 'react'
import { ButtonOutline, Container, EmptyMsgBox } from '../../styles/styles'
import { Box, InputBox, TopBox } from './AllNotes.styles'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import getAllNotes from '../../utils/getAllNotes';
import FilterModal from '../../components/Modal/FilterModal/FilterModal';

const AllNotes = () => {
  const dispatch = useAppDispatch();
  const [ searchInput, setSearchInput ] = useState('');
  const { mainNotes } = useAppSelector((state) => state.notesList);
  const { viewFiltersModal } = useAppSelector((state) => state.modal);

  const [ filter, setFilter]  = useState('');

  return (
    <Container>
      { viewFiltersModal && (
        <FilterModal />
      )}
      { mainNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ):(
        <>
          <TopBox>
            <InputBox>
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='검색어를 입력해주세요.'
              />
            </InputBox>
            <div className='notes__filter-btn'>
              <ButtonOutline
                onClick={() => dispatch(toggleFiltersModal(true))}
              >
                <span>정렬</span>
              </ButtonOutline>
            </div>
          </TopBox>
          <Box>
            {getAllNotes(mainNotes, filter)}
          </Box>
        </>
      )}

    </Container>
  )
}

export default AllNotes