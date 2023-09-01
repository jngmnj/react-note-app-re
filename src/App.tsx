import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './layout/Navbar/Navbar';
import { AllNotes, ArchiveNotes, ErrorPage, TagNotes, TrashNotes } from './pages';
import Sidebar from './layout/Sidebar/Sidebar';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<AllNotes />} />
              <Route path="/archive" element={<ArchiveNotes />} />
              <Route path="/trash" element={<TrashNotes />} />
              <Route path="/tag/:name" element={<TagNotes />} />
              <Route path="/404" element={<ErrorPage />} />
              <Route path="/*" element={<Navigate to={"/404"}/>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
