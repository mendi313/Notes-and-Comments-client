import { useState, ChangeEvent } from 'react';
import '../style/AddNote.css';
import { Note } from '../types/note';

type CreateNoteProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (item: string) => void;
  editNote?: Note;
};

const CreateNote: React.FC<CreateNoteProps> = ({ open, onClose, onCreate, editNote }) => {
  const [inputValue, setInputValue] = useState<string>(editNote?.title || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCreate = () => {
    onCreate(inputValue);
    setInputValue('');
  };

  return (
    <div className={`bg-white mx-auto p-3 rounded-lg w-[50%] dialog ${open ? 'open' : ''}`}>
      <h2 className="text-center font-bold text-[#07C7A4]">Create New Note</h2>
      <div className="m-5 mx-auto flex justify-center items-center">
        <input className="note-input p-4 rounded-l-md" type="text" value={inputValue} onChange={handleInputChange} placeholder="Note" />
        <div className="button-container flex gap-3">
          <button
            className="bg-[#07C7A4] text-white font-medium border border-y-1 border-[#07c7a4] border-x-0 p-4 rounded-r-md w-[7rem]"
            onClick={handleCreate}
          >
            {editNote ? 'Update' : 'Create'}
          </button>
          <button className="text-[#07C7A4] font-medium" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
