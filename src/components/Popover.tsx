import { useState } from 'react';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import AddIcon from './icons/AddIcon';
import { useNotes } from '../Context/NotesContext';

export function PopoverDefault() {
  const { setDialogOpen, editNote } = useNotes();
  const [openPopover, setOpenPopover] = useState(false);

  const handleAddComment = () => {
    if (editNote) setDialogOpen(true);
  };

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
    onClick: () => handleAddComment(),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button>
          <AddIcon />
        </Button>
      </PopoverHandler>
      {!editNote ? <PopoverContent>Choose Note For Add A Comment</PopoverContent> : null}
    </Popover>
  );
}
