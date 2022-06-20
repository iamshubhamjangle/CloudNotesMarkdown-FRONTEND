import ErrorAlert from "components/ErrorAlert";
import Loading from "components/Loading";
import MainHeader from "components/MainHeader";
import { createNewNote, setCreateNoteError } from "features/notes/noteSlice";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateNoteScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.user);
  const { createNoteLoading, createNoteError } = useSelector(
    (store) => store.notes
  );

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      dispatch(setCreateNoteError("Please fill all the fields!"));
      return;
    }

    const requestBody = { title, content, category };
    const token = userInfo.token;

    dispatch(createNewNote({ token, requestBody }));

    resetHandler();
    navigate("/notes");
  };

  return (
    <MainHeader title="Create a new note">
      <div id="login-div" className="row justify-content-center">
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
          {createNoteLoading && (
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
          {!createNoteLoading && (
            <button type="submit" className="btn btn-primary my-2 mx-1">
              Create Note
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline-dark my-2  mx-1"
            onClick={resetHandler}
          >
            Clear Fields
          </button>
          <div className="form-control text-muted my-2">
            Creating on:{" "}
            {new Date().toJSON().slice(0, 10).split("-").reverse().join("/")}
          </div>
          {createNoteError && <ErrorAlert children={createNoteError} />}
        </form>
      </div>
    </MainHeader>
  );
};

export default CreateNoteScreen;
