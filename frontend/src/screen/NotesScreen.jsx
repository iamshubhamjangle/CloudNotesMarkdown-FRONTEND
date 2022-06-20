import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import MainHeader from "components/MainHeader";
import ErrorAlert from "components/ErrorAlert";
import { useDispatch } from "react-redux";
import { deleteNote, fetchNotesList } from "features/notes/noteSlice";
import ReactMarkdown from "react-markdown";
import SuccessAlert from "components/SuccessAlert";
import { WriteSomeNotes } from "components/icons";

function NotesScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.user);
  const {
    fetchNotesLoading,
    fetchNotesError,
    deleteNoteLoading,
    deleteNoteError,
    deleteNoteSuccess,
    searchBarText,
    notes,
  } = useSelector((store) => store.notes);

  const fetchNotes = async () => {
    dispatch(fetchNotesList(userInfo.token));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }

    fetchNotes();
  }, [userInfo, deleteNoteSuccess, searchBarText]);

  const deleteHandler = (id) => {
    const token = userInfo.token;

    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote({ token, id }));
    }
  };

  return (
    <MainHeader title="Your Notes">
      {(!fetchNotesLoading || !deleteNoteLoading) && (
        <div className="d-flex justify-content-end">
          <Link to="/create-note">
            <button type="button" className="btn btn-primary">
              Create New Note
            </button>
          </Link>
        </div>
      )}
      {(fetchNotesLoading || deleteNoteLoading) && (
        <Loading className="d-flex justify-content-center" color="dodgerblue" />
      )}
      {(fetchNotesError || deleteNoteError) && (
        <ErrorAlert>{fetchNotesError}</ErrorAlert>
      )}
      {notes &&
        notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchBarText.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <div
              className="accordion shadow-sm my-3"
              id="accordionPanelsStayOpenExample"
              key={note._id}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse-${note._id}`}
                  >
                    <div className="d-flex row w-100 align-items-center">
                      <div className="fw-bold col-6 col-lg-9">{note.title}</div>
                      <div className="col-6 col-lg-3 d-flex justify-content-end align-items-center">
                        <Link to={`/update-note/${note._id}`}>
                          <div className="btn btn-outline-primary btn-sm mx-2">
                            Edit
                          </div>
                        </Link>
                        <div
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteHandler(note._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapse-${note._id}`}
                  className="accordion-collapse collapse"
                >
                  <span className="badge rounded-pill bg-secondary ms-3 mt-3">
                    {note.category}
                  </span>
                  {/* <div
                    className="accordion-body"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {note.content}
                  </div> */}
                  <div className="accordion-body mb-3">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {notes.length == 0 && (
        <div className="text-center my-5">
          <h1>Go ahead and create some markdown notes!</h1>
          <WriteSomeNotes className="img-fluid my-5" />
        </div>
      )}
    </MainHeader>
  );
}

export default NotesScreen;
