import './style/App.css';
import { Routes, Route } from 'react-router-dom';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import { NotesProvider } from './Context/NotesContext';

export default function App() {
  return (
    <div className="w-full">
      <NotesProvider>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/addNote" element={<AddNote />} />
        </Routes>
      </NotesProvider>
    </div>
  );
}
