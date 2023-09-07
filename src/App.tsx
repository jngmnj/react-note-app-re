import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './layout/Navbar/Navbar';
import { AllNotes, ArchiveNotes, ErrorPage, TagNotes, TrashNotes } from './pages';
import Sidebar from './layout/Sidebar/Sidebar';
import Layout from './layout/Layout';
import { useAppSelector } from './hooks/redux';
import TagsModal from './components/Modal/TagsModal/TagsModal';
import CreateNoteModal from './components/Modal/CreateNoteModal/CreateNoteModal';

function App() {
  const { viewEditTagsModal, viewCreateNoteModal } = useAppSelector((state) => state.modal);

  return (
    <div className="app">
      { viewCreateNoteModal && <CreateNoteModal /> }
      { viewEditTagsModal && <TagsModal type='edit' /> }
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
