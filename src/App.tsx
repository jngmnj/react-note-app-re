import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AllNotes, ArchiveNotes, ErrorPage, TagNotes, TrashNotes, Notes } from './pages';
import Layout from './layout/Layout';
import { useAppSelector } from './hooks/redux';
import TagsModal from './components/Modal/TagsModal/TagsModal';
import CreateNoteModal from './components/Modal/CreateNoteModal/CreateNoteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { viewEditTagsModal, viewCreateNoteModal } = useAppSelector((state) => state.modal);

  return (
    <div className="app">
      {viewCreateNoteModal && <CreateNoteModal />}
      {viewEditTagsModal && <TagsModal type="edit" />}
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<AllNotes />} />
            <Route path="/archive" element={<Notes />} />
            <Route path="/trash" element={<Notes />} />
            <Route path="/tag/:name" element={<TagNotes />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<Navigate to={"/404"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
