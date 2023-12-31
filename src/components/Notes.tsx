import '../style/Notes.css';
import { useNotes } from '../Context/NotesContext';
import NoteItem from './NoteItem';
import {useNavigate } from 'react-router-dom';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { Note } from '../types/note';

export default function Notes() {
  const navigate = useNavigate();
  const { notes, getComments, editNote, updateComment, setEditComments, editComments, setEditNote, dialogOpen, setDialogOpen, addComment } =
    useNotes();

  async function handleSelectNote(note: Note) {
    setEditNote(note);
    await getComments(note._id);
  }

  const handleCloseDialog = () => {
    setEditComments(undefined);
    setDialogOpen(false);
  };

  const handleCreate = async (context: string) => {
    if (editComments) {
      await updateComment(context);
    } else {
      if (editNote) await addComment(editNote?._id, context);
    }
    handleCloseDialog(); // Close the dialog
  };

  const handelCreateButton = () => {
    setEditNote(undefined)
    navigate('/addNote');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`main w-full ${dialogOpen ? 'blur-sm' : ''}`}>
        <div className="notes flex flex-col justify-between">
          <h2 className="text-[#07C7A4] m-3 font-medium font-sans">NOTES</h2>
          <div className="w-full notes-container">
            {notes.map((noteItem) => (
              <div className="cursor-pointer" key={noteItem._id} onClick={() => handleSelectNote(noteItem)}>
                <NoteItem selected={noteItem._id === editNote?._id} _id={noteItem._id} title={noteItem.title} />
              </div>
            ))}
          </div>
          <div>
            <button onClick={handelCreateButton} className="create-Button flex mb-5 text-white font-mono text-lg items-center justify-center ">
              Create New Note
            </button>
          </div>
        </div>
        <div className="comments w-full">
          <Comments />
        </div>
      </div>
      {dialogOpen && (
        <div className="absolute">
          <CreateComment
            open={false} // You can control the open state as needed
            onClose={handleCloseDialog}
            onCreate={handleCreate}
            editComments={editComments}
          />
        </div>
      )}
    </div>
  );
}
