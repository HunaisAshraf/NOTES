import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { IoSend } from "react-icons/io5";

const Home = () => {
  const [input, setInput] = useState("");
  const [change, setChange] = useState(false);
  const [note, setNote] = useState<string[]>([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

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
    <div>
      <Toaster />
      <Header />
      <div className="flex flex-wrap gap-3">
        <form className="border-2 max-w-52 h-48 rounded" onSubmit={addNote}>
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
        {note?.map((n: any) => (
          <div key={n._id} className="w-52 h-48  rounded border-2 p-2">
            <p>{n.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
