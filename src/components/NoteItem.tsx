import '../style/NoteItem.css';
import { Note } from '../types/note';
import DeleteIcon from './icons/DeleteIcon';
import { useNotes } from '../Context/NotesContext';
import { useState } from 'react';
import EditIcon from './icons/EditIcon';
import { useNavigate } from 'react-router-dom';

export default function NoteItem(note :Note) {
  const navigate = useNavigate();
  const { deleteNote, setEditNote } = useNotes();
  const [isDelete, setIsDelete] = useState(false);

  async function handleDeleteNote() {
    setIsDelete(true);
    deleteNote(note._id).then(() => {
      setIsDelete(false);
    });
  }

  function handleEditNote() {
    setEditNote(note);
    navigate('/addNote');
  }

  return (
    <div className={`note flex justify-between ${note.selected ? 'bg-[#ffb80099] text-white' : ''}`}>
      {note.title}
      <div className="flex gap-5">
        <button onClick={handleEditNote}>
          <EditIcon />
        </button>
        <button className="cursor-pointer" onClick={handleDeleteNote} disabled={isDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
