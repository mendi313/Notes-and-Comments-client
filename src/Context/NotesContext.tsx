import axios from 'axios';
import { Comment, Note } from '../types/note';
import { createContext, ReactNode, useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';

type NotesProviderProps = {
  children: ReactNode;
};

type NotesContext = {
  notes: Note[];
  comments: Comment[];
  editComments: Comment | undefined;
  editNote: Note | undefined;
  dialogOpen: boolean;
  setEditNote: Dispatch<SetStateAction<Note | undefined>>;
  setEditComments: Dispatch<SetStateAction<Comment | undefined>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  loadNotes: (data: Note[]) => void;
  deleteNote: (noteId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  addNote: (note: string) => Promise<void>;
  addComment: (noteId: string, text: string) => Promise<void>;
  getComments: (noteId: string) => Promise<void>;
  updateComment: (updatedText: string) => Promise<void>; // Add the updateComment function
  updateNote: (updatedTitle: string) => Promise<void>; 
};

const NotesContext = createContext({} as NotesContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editComments, setEditComments] = useState<Comment>();
  const [editNote, setEditNote] = useState<Note>();
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:3000/api/notes').then((res) => {
      setNotes(res.data);
    });
  }, []);

  function loadNotes(data: Note[]): void {
    setNotes(data);
  }

  const deleteNote = async (noteId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setEditNote(undefined);
      if (editNote?._id === noteId) {
        setComments([]);
      }
    } catch (error) {
      console.error('Error deleting the note:', error);
    }
  };

  const updateNote = async ( updatedTitle: string) => {
    const noteId = editNote?._id
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/${noteId}`, { title: updatedTitle });
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) => {
          if (note._id === noteId) {
            return { ...note, title: updatedTitle };
          }
          return note;
        });
        return updatedNotes;
      });
      return response.data;
    } catch (error) {
      console.error('Error updating the note:', error);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`).then(() => {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      });
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };
  const addComment = async (noteId: string, text: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/comments?noteId=${noteId}`, { text });
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error) {
      console.error('Error adding a comment:', error);
    }
  };

  const updateComment = async (updatedText: string) => {
    const commentId = editComments?._id
    try {
      const response = await axios.put(`http://localhost:3000/api/comments/${commentId}`, { text: updatedText });
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, text: updatedText };
          }
          return comment;
        });
        return updatedComments;
      });
      return response.data;
    } catch (error) {
      console.error('Error updating the comment:', error);
    }
  };

  const addNote = async (note: string) => {
    try {
      await axios.post('http://localhost:3000/api/notes', { title: note }).then((res) => {
        setNotes(res.data);
      });
    } catch (error) {
      console.error('Error adding the note:', error);
    }
  };

  const getComments = async (noteId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments?noteId=${noteId}`);
      setComments(response.data);
      return;
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        updateNote,
        dialogOpen,
        editComments,
        setEditComments,
        setDialogOpen,
        editNote,
        setEditNote,
        notes,
        setNotes,
        loadNotes,
        deleteNote,
        getComments,
        comments,
        deleteComment,
        addComment,
        setComments,
        addNote,
        updateComment, // Add the updateComment function
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
