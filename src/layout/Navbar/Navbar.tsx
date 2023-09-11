import React from 'react'
import { Container, StyledNav } from './Navbar.styles'
import { FiMenu } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useLocation } from 'react-router-dom';
import { toggleMenu } from '../../store/menu/menuSlice';
import { ButtonFill } from '../../styles/styles';
import { toggleCreateNoteModal } from '../../store/modal/modalSlice';
import getStandardName from '../../utils/getStandardName';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.menu);
  const { pathname, state } = useLocation(); // state는 어디서 지정함?
  console.log(state, pathname);

  if(pathname === "/404") return null; 

  return (
    <StyledNav>
      <div className="nav__menu">
        <FiMenu onClick={() => dispatch(toggleMenu(!isOpen))} />
      </div>
      <Container>
        <div className="nav__page-title">{state ? getStandardName(state) : "Notes"}</div>
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill onClick={() => dispatch(toggleCreateNoteModal(true))}>
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
}

export default Navbar