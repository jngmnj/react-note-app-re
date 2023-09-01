import React from 'react'
import { Container, ItemsBox, MainBox, StyledLogo } from './Sidebar.style'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import { NavLink } from 'react-router-dom';
import { FaLightbulb, FaTag } from 'react-icons/fa';
import getStandardName from '../../utils/getStandardName';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.menu);
  const { tagsList } = useAppSelector((state) => state.tags);

  return (
    <Container $openMenu={isOpen ? "open" : ""}>
      <MainBox $openMenu={isOpen ? "open" : ""}>
        <StyledLogo>
          <h1>KEEP</h1>
        </StyledLogo>
        <ItemsBox>
          <li onClick={() => dispatch(toggleMenu(!isOpen))}>
            <NavLink
              to={"/"}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Notes</span>
            </NavLink>
          </li>
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(!isOpen))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
}

export default Sidebar