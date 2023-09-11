import React from 'react'
import { Tag } from '../../../types/tag';

interface TagsModalProps {
  type: string;
  addedTags: Tag[];
  handleTags: (tag: string, type: string) => void;
}
const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  return <div>TagsModal</div>;
};

export default TagsModal