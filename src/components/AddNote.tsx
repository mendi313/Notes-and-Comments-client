import { useNotes } from '../Context/NotesContext';
import CreateNote from './CreateNote';
import { useNavigate } from 'react-router-dom';

export default function AddNote() {
  const navigate = useNavigate();
  const { addNote, editNote, updateNote, setEditNote } = useNotes();

  const handleCloseDialog = () => {
    setEditNote(undefined);
    navigate('/');
  };

  const handleCreate = async (context: string) => {
    if (editNote) {
      await updateNote(context);
    } else {
      await addNote(context);
    }
    handleCloseDialog(); // Close the dialog
  };

  return (
    <div>
      <CreateNote open={true} onClose={handleCloseDialog} onCreate={handleCreate} editNote={editNote} />
    </div>
  );
}
