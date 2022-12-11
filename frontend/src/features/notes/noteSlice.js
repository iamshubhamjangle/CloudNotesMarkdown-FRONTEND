import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  fetchNotesLoading: false,
  fetchNotesError: null,
  createNoteLoading: false,
  createNoteError: null,
  updateNoteLoading: false,
  updateNoteError: null,
  updateNoteSuccess: false,
  deleteNoteLoading: false,
  deleteNoteError: null,
  deleteNoteSuccess: false,
  searchBarText: "",
  notes: [],
};

const backend_api = process.env.REACT_APP_BACKEND_API;
const fetchAllNotesUrl = backend_api + "/api/notes";
const createNewNoteUrl = backend_api + "/api/notes/create";

/**
 * @param token token string
 * @description Fetch notes from server and return a promise
 */
export const fetchNotesList = createAsyncThunk(
  "note/fetchAll",
  async (token, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(fetchAllNotesUrl, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @param obj.token token string
 * @param obj.requestBody title, content, category
 * @returns void
 * @description call this function to create a new note
 */
export const createNewNote = createAsyncThunk(
  "note/create",
  async ({ token, requestBody }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        createNewNoteUrl,
        { ...requestBody },
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @param obj.token token string
 * @param obj.noteId noteId string
 * @param obj.requestBody noteId, title, content, category
 * @returns void
 * @description call this function to update existing note
 */
export const updateNote = createAsyncThunk(
  "note/update",
  async ({ token, requestBody }, thunkAPI) => {
    const { noteId, title, content, category } = requestBody;
    const updateNoteUrl = `/api/notes/${noteId}`;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        updateNoteUrl,
        { title, content, category },
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @param obj.token token string
 * @param obj.noteId noteId
 * @returns void
 * @description call this function to delete existing note
 */
export const deleteNote = createAsyncThunk(
  "note/delete",
  async ({ token, id: noteId }, thunkAPI) => {
    const deleteNoteUrl = `/api/notes/${noteId}`;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(deleteNoteUrl, config);

      data._id = noteId;
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCreateNoteError: (state, { payload }) => {
      state.createNoteError = payload;
    },
    setUpdateNoteError: (state, { payload }) => {
      state.updateNoteError = payload;
    },
    setSearchBarText: (state, { payload }) => {
      state.searchBarText = payload;
    },
  },
  extraReducers: {
    /**
     * Fetch Notes Reducer
     */
    [fetchNotesList.pending]: (state) => {
      state.fetchNotesLoading = true;
      state.updateNoteSuccess = false;
    },
    [fetchNotesList.fulfilled]: (state, { payload }) => {
      state.notes = payload;
      state.fetchNotesError = "";
      state.fetchNotesLoading = false;
      state.deleteNoteSuccess = false;
    },
    [fetchNotesList.rejected]: (state, { payload }) => {
      state.fetchNotesLoading = false;
      state.fetchNotesError = payload;
      state.deleteNoteSuccess = false;
    },
    /**
     * Create New Note Reducer
     */
    [createNewNote.pending]: (state) => {
      state.createNoteLoading = true;
      state.createNoteError = "";
      state.deleteNoteSuccess = false;
    },
    [createNewNote.fulfilled]: (state, { payload }) => {
      state.notes.push(payload);
      state.createNoteLoading = false;
      state.createNoteError = "";
    },
    [createNewNote.rejected]: (state, { payload }) => {
      state.createNoteLoading = false;
      state.createNoteError = payload;
    },
    /**
     * Update Note Reducer
     */
    [updateNote.pending]: (state) => {
      state.updateNoteLoading = true;
      state.updateNoteSuccess = false;
      state.updateNoteError = "";
      state.deleteNoteSuccess = false;
    },
    [updateNote.fulfilled]: (state, { payload }) => {
      let foundIndex = state.notes.findIndex(
        (note) => note._id === payload._id
      );
      state.notes[foundIndex] = payload;
      state.updateNoteLoading = false;
      state.updateNoteError = "";
      state.updateNoteSuccess = true;
    },
    [updateNote.rejected]: (state, { payload }) => {
      state.updateNoteLoading = false;
      state.updateNoteError = payload;
      state.updateNoteSuccess = false;
    },
    /**
     * Delete Note Reducer
     */
    [deleteNote.pending]: (state) => {
      state.deleteNoteLoading = true;
      state.deleteNoteSuccess = false;
      state.deleteNoteError = "";
    },
    [deleteNote.fulfilled]: (state, { payload }) => {
      let foundIndex = state.notes.findIndex(
        (note) => note._id === payload._id
      );
      state.notes.splice(foundIndex, 1);
      state.deleteNoteLoading = false;
      state.deleteNoteError = "";
      state.deleteNoteSuccess = true;
    },
    [deleteNote.rejected]: (state, { payload }) => {
      state.deleteNoteLoading = false;
      state.deleteNoteError = payload;
      state.deleteNoteSuccess = false;
    },
  },
});

export default noteSlice.reducer;
export const { setCreateNoteError, setUpdateNoteError, setSearchBarText } =
  noteSlice.actions;
