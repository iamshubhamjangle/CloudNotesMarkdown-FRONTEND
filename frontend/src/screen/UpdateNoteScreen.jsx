import MainHeader from "components/MainHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import Loading from "components/Loading";
import ErrorAlert from "components/ErrorAlert";
import { setUpdateNoteError, updateNote } from "features/notes/noteSlice";
import { useNavigate, useParams } from "react-router-dom";
import SuccessAlert from "components/SuccessAlert";

const UpdateNoteScreen = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [noteId, setNoteId] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams(); // To pull id passed in URL
  const navigate = useNavigate();

  const { updateNoteLoading, updateNoteError, updateNoteSuccess, notes } =
    useSelector((store) => store.notes);
  const { userInfo } = useSelector((store) => store.user);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!noteId) {
      dispatch(setUpdateNoteError("Note id was not found in URL!"));
      return;
    }

    if (!title || !content || !category) {
      dispatch(setUpdateNoteError("Please fill all the fields!"));
      return;
    }

    const requestBody = { noteId, title, content, category };
    const token = userInfo.token;

    dispatch(updateNote({ token, requestBody }));

    resetHandler();
    // navigate("/notes");
  };

  useEffect(() => {
    const singleNote = notes.find((note) => note._id === id);

    if (singleNote) {
      setTitle(singleNote.title);
      setContent(singleNote.content);
      setCategory(singleNote.category);
      setDate(singleNote.updatedAt);
      setNoteId(id);
    } else {
      navigate("/notes");
    }
  }, [notes]);

  return (
    <MainHeader title="Update your note">
      <div className="row justify-content-center">
        <form className="col-10 col-lg-8" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="InputTitleField" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="InputTitleField"
              value={title}
              aria-describedby="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ContentInput" className="form-label">
              Content
            </label>
            <textarea
              id="ContentInput"
              value={content}
              className="form-control"
              rows="3"
              placeholder="What's in your mind?"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            ></textarea>
          </div>
          {content && (
            <div className="mb-3 form-control">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="InputCategoryField" className="form-label">
              Category
            </label>
            <input
              type="text"
              value={category}
              className="form-control"
              id="InputCategoryField"
              aria-describedby="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            />
          </div>
          {updateNoteLoading && (
            <button
              className="btn btn-primary my-2 mx-1"
              style={{ minWidth: "100px" }}
              disabled
            >
              <Loading
                className="d-flex justify-content-center"
                color="dodgerblue"
              />
            </button>
          )}
          {!updateNoteLoading && (
            <button type="submit" className="btn btn-primary my-2 mx-1">
              Update Note
            </button>
          )}
          {!updateNoteLoading && (
            <button
              type="button"
              className="btn btn-outline-dark my-2  mx-1"
              onClick={resetHandler}
            >
              Clear Fields
            </button>
          )}
          {updateNoteError && <ErrorAlert children={updateNoteError} />}
          {updateNoteSuccess && (
            <SuccessAlert>Note was Updated Successfully!</SuccessAlert>
          )}
        </form>
      </div>
    </MainHeader>
  );
};

export default UpdateNoteScreen;
