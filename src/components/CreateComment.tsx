import { useState, ChangeEvent } from 'react';
import { Comment } from '../types/note';
import '../style/AddNote.css';

type CreateCommentProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (item: string) => void;
  editComments?: Comment;
};

const CreateComment: React.FC<CreateCommentProps> = ({ open, onClose, onCreate, editComments }) => {
  const [inputValue, setInputValue] = useState<string>(editComments?.text || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCreate = () => {
    onCreate(inputValue);
    setInputValue('');
  };

  return (
    <div className={`bg-white w-[560px] mx-auto p-7 border border-[#07C7A4] border-solid border-1 rounded-lg dialog ${open ? 'open' : ''}`}>
      <h2 className="text-center font-semibold text-[#07C7A4]">Comments</h2>
      <div className="m-5 mx-auto flex justify-center flex-col items-center">
        <input className="note-input w-4/6 p-4 rounded-l-md" type="text" value={inputValue} onChange={handleInputChange} placeholder="Comment" />
        <div className="button-container flex gap-10 mt-5">
          <button className="text-[#07C7A4] font-medium" onClick={handleCreate}>
            {editComments ? 'Update' : 'Save'}
          </button>
          <button className="text-[#07C7A4] font-medium" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
