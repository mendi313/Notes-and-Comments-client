export type Note = {
    _id: string;
    title: string;
    selected: boolean; 
    created_at?: Date;
  }
export type Comment = {
    _id: string;
    text: string;
    created_at?: Date;
  }

  export type NoteContextType = {
    notes: Note[];
    saveTodo: (note: Note) => void;
  };