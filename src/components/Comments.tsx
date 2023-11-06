import { useNotes } from '../Context/NotesContext';
import CommentItem from './CommentItem'; // Import the CommentItem component
import { PopoverDefault } from './Popover';

export default function Comments() {
  const { comments } = useNotes();

  return (
    <div className="w-full ">
      <h2 className="text-[#07C7A4] text-center m-3 font-medium font-sans">Comments</h2>
      <div className="h-[27rem] flex flex-col justify-between">
        <div>
          {comments.length > 0 ? (
            <div className="h-full">
              {comments.map((comment, index) => (
                <CommentItem key={comment._id} index={index} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-center text-rose-850 font-sans font-medium">No comments available</p>
          )}
        </div>
        <div className=" mb-6 mr-6 flex justify-between">
          <div></div>
          <PopoverDefault />
        </div>
      </div>
    </div>
  );
}
