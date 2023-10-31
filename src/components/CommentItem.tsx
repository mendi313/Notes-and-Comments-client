import { useState } from 'react';
import { Comment } from '../types/note';
import DeleteIcon from './icons/DeleteIcon';
import { useNotes } from '../Context/NotesContext';
import EditIcon from './icons/EditIcon';

export default function CommentItem({ comment, index }: { comment: Comment; index: number }) {
  const { deleteComment, setDialogOpen, setEditComments } = useNotes();
  const [isDelete, setIsDelete] = useState(false);

  async function handleDeleteNote() {
    setIsDelete(true);
    deleteComment(comment._id).then(() => {
      setIsDelete(false);
    });
  }

  function handleEditComment() {
    setDialogOpen(true);
    setEditComments(comment);
  }

  return (
    <div>
      <div className="text-[#07C7A4] font-sans border flex justify-between border-[#07C7A4] rounded-sm p-2">
        {index + 1}. {comment.text}
        <div className="flex gap-5">
          <button onClick={handleEditComment}>
            <EditIcon />
          </button>
          <button onClick={handleDeleteNote} disabled={isDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
