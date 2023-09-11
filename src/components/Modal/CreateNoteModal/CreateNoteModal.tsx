import React,{ useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import * as Style from './CreateNoteModal.styles';
import { FaTimes } from 'react-icons/fa';
import { toggleCreateNoteModal, toggleTagsModal } from '../../../store/modal/modalSlice';
import TagsModal from '../TagsModal/TagsModal';
import { setEditNote, setMainNotes } from '../../../store/notesList/notesListSlice';
import TextEditor from '../../TextEditor/TextEditor';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';
import dayjs from 'dayjs';
import { Note } from '../../../types/note';

const CreateNoteModal = () => {
  const dispatch = useAppDispatch();

  const { editNote } = useAppSelector((state) => state.notesList);
  const { viewAddTagsModal } = useAppSelector((state) => state.modal);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [content, setContent] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || "");
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "");
  

  const closeCreateNoteModal = () => {
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  }
  
  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLowerCase();
    if(type === 'add') {
      setAddedTags((prev) => [...prev, {tag: newTag, id: v4()}])
    } else { // delete
      setAddedTags(addedTags.filter(({tag}) => tag !== newTag));
    }
  };

  // 유효성검사
  const createNoteHanlder = () => {
    if(!noteTitle) {
      toast.error("타이틀을 작성해주세요");
      return;
    } else if (content === "<p><br/></p>") {
      toast.error("내용을 작성해주세요.");
      return;
    }

    const date= dayjs().format("DD/MM/YYYY h:mm A");

    let note: Partial<Note> = {
      title: noteTitle,
      content,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime()
    }

    if(editNote) {
      note = {...editNote, ...note}
    } else {
      note = {
        ...note, 
        date,
        createdTime: new Date.getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4()
      }
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  }
  return (
    <FixedContainer>
      {viewAddTagsModal && (
        <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />
      )}
      <Style.Box>
        <Style.TopBox>
          <div className="createNote_title">
            {editNote ? "노트 수정하기" : "노트 생성하기"}
          </div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={closeCreateNoteModal}
          >
            <FaTimes />
          </DeleteBox>
        </Style.TopBox>
        <Style.StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="제목..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <TextEditor
          color={noteColor}
          content={content}
          setContent={setContent}
        />

        <Style.AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__Tag">{tag}</span>
              <span
                className="createNote__tag-remove"
                onClick={() => tagsHandler(tag, "remove")}
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </Style.AddedTagsBox>
        <Style.OptionsBox>
          <ButtonOutline
            onClick={() =>
              dispatch(toggleTagsModal({ type: "add", view: "true" }))
            }
          >
            Add Tag
          </ButtonOutline>
          <div>
            <label>배경색 : </label>
            <select
              value={noteColor}
              id="color"
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">White</option>
              <option value="#ffcccc">Red</option>
              <option value="#ccffcc">Green</option>
              <option value="#cce0ff">Blue</option>
              <option value="#ffffcc">Yellow</option>
            </select>
          </div>
          <div>
            <label>우선순위 : </label>
            <select
              value={priority}
              id="priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </Style.OptionsBox>
        <div className="createNote__create-btn">
          <ButtonFill onClick={createNoteHanlder}>
            {editNote ? <span>저장하기</span> : <span>생성하기</span>}
          </ButtonFill>
        </div>
      </Style.Box>
    </FixedContainer>
  );
}

export default CreateNoteModal