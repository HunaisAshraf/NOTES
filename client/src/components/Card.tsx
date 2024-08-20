import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ note }: { note: { _id: string; note: string } }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: note._id,
      data: {
        type: "Column",
        note,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-yellow-50cd w-52 h-48  rounded border-2 p-2 hover:border-yellow-200 hover:border-2"
    >
      <p>{note.note}</p>
    </div>
  );
};

export default Card;
