import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { closestCorners, DndContext, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Card from "../components/Card";

type Note = {
  _id: string;
  note: string;
};

const Home = () => {
  const [input, setInput] = useState("");
  const [change, setChange] = useState(false);
  const [note, setNote] = useState<Note[]>([]);
  const [activeColummn, setActiveColumn] = useState<Note | null>();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const noteId = useMemo(() => note?.map((n: any) => n._id), [note]);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, token } = authContext;

  const addNote = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const data = await fetch(
        `${import.meta.env.VITE_SERVER_LINK}/api/note/add-note`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ note: input }),
        }
      );
      const json = await data.json();

      if (json.success) {
        setInput("");
        toast.success("Note added");
        setChange((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add note");
    }
  };

  const deleteNode = async () => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_LINK}/api/note/delete-note/${
          activeColummn?._id
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await data.json();

      if (json.success) {
        toast.success("Note deleted successfully");
        setChange((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dragStart = (event: any) => {
    console.log(event);
    if (event.active.data.current.type === "Column") {
      setActiveColumn(event.active.data.current.note);
      return;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          `${import.meta.env.VITE_SERVER_LINK}/api/note/get-notes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await data.json();
        if (json.success) {
          setNote(json.notes);
          console.log(json.notes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [change]);

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="overflow-hidden relative min-h-screen">
      <Toaster />
      <Header />
      <div className=" flex flex-wrap gap-3">
        <form className="border-2 w-52 h-48 rounded" onSubmit={addNote}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-44 max-w-44 outline-none p-2"
            placeholder="Type..."
            required
          />
          <button
            type="submit"
            className="bg-yellow-300 p-1 rounded-full text-slate-600"
          >
            <IoSend />
          </button>
        </form>
        <DndContext onDragStart={dragStart} collisionDetection={closestCorners}>
          <SortableContext items={noteId}>
            {note?.map((n: Note) => (
              <Card key={n._id} note={n} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div onMouseUp={deleteNode} className="absolute bottom-0 right-0 p-4">
        <MdDelete className="text-5xl bg-yellow-300 p-2 rounded-full text-slate-600" />
      </div>
    </div>
  );
};

export default Home;
