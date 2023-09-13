import React, { useState } from 'react'
import { Tag } from '../../../types/tag';
import * as Style from './TagsModal.styles';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import getStandardName from '../../../utils/getStandardName';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import { v4 } from 'uuid';
import { removeTags } from '../../../store/notesList/notesListSlice';

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}
const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState('');
  
  // 태그등록
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!inputText) return;

    dispatch(addTags({tag: inputText.toLowerCase(), id: v4()}));
    setInputText('');
  }

  // 태그삭제
  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags(tag)); 
  }

  return (
    <FixedContainer>
      <Style.Box>
        <div className="editTags__header">
          <div className="editTags__title">
            {type === "add" ? "ADD" : "Edit"} Tags
          </div>
          <DeleteBox
            className="editTags__close"
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <Style.StyledInput
            type="text"
            value={inputText}
            placeholder="new tag..."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <Style.TagsBox>
          {tagsList.map(({tag, id}) => (
            <li key={id}>
              <div className="editTags__tag">{getStandardName(tag)}</div>
              {type === "edit" ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : ( // type === add
                <DeleteBox>
                  {addedTags?.find( // addedTag라면
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? ( // true
                    <FaMinus 
                      onClick={() => handleTags!(tag, "remove")}
                    />
                  ) : ( // false
                    <FaPlus
                      onClick={() => handleTags!(tag, "add")}
                    />
                  )}
                </DeleteBox>
              )} 
            </li>
          ))}
        </Style.TagsBox>
      </Style.Box>
    </FixedContainer>
  );
};

export default TagsModal