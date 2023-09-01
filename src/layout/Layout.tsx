import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="app__container">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout