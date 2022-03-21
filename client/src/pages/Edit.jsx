import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

const Edit = () => {
  const [note, setNote] = useState({
    title: "",
    text: "",
    date: "",
  });

  const navigate = useNavigate();
  const titleRef = useRef(null);
  const { id } = useParams();

  const characterLimit = 225;

  const { title, text, date } = note;

  // Get user note
  const getNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (id) {
        const response = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        // console.log(id);
        // console.log(response.data);
        const { title, text, date } = response.data;
        setNote({
          title,
          text,
          date: new Date(date).toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add input to note state
  const getNoteInput = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNote((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Edit note
  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // If token exists
      if (token) {
        const editedNote = {
          title,
          text,
          date,
        };
        const response = await axios.put(`/api/notes/${id}`, editedNote, {
          headers: { Authorization: token },
        });
        // console.log(response.data);
        // When note updated, redirect home
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Focus title input on initial load
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    getNote();
  }, [id]);

  return (
    <>
      <Nav />
      <section className="container">
        <h1>Edit note</h1>
        <div className="note">
          <form onSubmit={editNote} autoComplete="off">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                required
                onChange={getNoteInput}
                placeholder="Enter title"
                ref={titleRef}
              />
            </div>

            {/* Text */}
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <textarea
                name="text"
                id="text"
                rows="10"
                value={text}
                required
                onChange={getNoteInput}
                placeholder="Enter text"
              ></textarea>
              <small>{characterLimit - text.length} Remaining</small>
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">Date: {date}</label>
              <input
                type="date"
                name="date"
                id="date"
                required
                onChange={getNoteInput}
              />
            </div>

            <button type="submit" className="create-btn">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit;
