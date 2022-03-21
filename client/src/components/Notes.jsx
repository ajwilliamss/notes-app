import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import TimeAgo from "timeago-react";
import { LoadingContext } from "../contexts/LoadingContext";
import { SearchContext } from "../contexts/SearchContext";
import Spinner from "./Spinner";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { search } = useContext(SearchContext);

  // Get user notes
  const getNotes = async (token) => {
    try {
      setIsLoading(true);
      // If token exists
      if (token) {
        const response = await axios.get("/api/notes", {
          headers: { Authorization: token },
        });
        // console.log(response);
        setNotes(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Search functionality
  const handleSearch = () => {
    const noteSearch = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search) ||
        note.text.toLowerCase().includes(search)
    );
    setFilteredNotes(noteSearch);
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      // console.log(id);
      if (userToken) {
        const response = await axios.delete(`/api/notes/${id}`, {
          headers: { Authorization: userToken },
        });
        // console.log(response);
        getNotes(userToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);

    if (token) {
      getNotes(token);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [notes, search]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Nav />
      {notes.length > 0 ? (
        <section className="notes">
          {filteredNotes.map((note) => {
            const { _id, title, text, date } = note;

            return (
              <div className="note" key={_id}>
                <h4 className="note-title">{title}</h4>
                <p className="note-text">{text}</p>
                <div className="note-footer">
                  <p className="note-date">{<TimeAgo datetime={date} />}</p>
                  <div className="note-btns">
                    <button type="button">
                      <Link to={`/edit/${_id}`}>
                        <FaEdit
                          style={{
                            color: "rgba(0, 150, 0, 0.815)",
                            fontSize: "1.35rem",
                          }}
                        />
                      </Link>
                    </button>
                    <button type="button" onClick={() => deleteNote(_id)}>
                      <FaTrash
                        style={{
                          color: "rgba(150, 0, 0, 0.815)",
                          fontSize: "1.35rem",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="notes">
          <h2>
            You have not added any notes, add a note&nbsp;
            <Link to="/create">here</Link>
          </h2>
        </section>
      )}
    </>
  );
};

export default Notes;
