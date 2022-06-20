import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "components/footer";
import { Header } from "components/header";
import HomeScreen from "screen/HomeScreen";
import LoginScreen from "screen/LoginScreen";
import RegisterScreen from "screen/RegisterScreen";
import NotesScreen from "screen/NotesScreen";
import CreateNoteScreen from "screen/CreateNoteScreen";
import UpdateNoteScreen from "screen/UpdateNoteScreen";
import UserProfileScreen from "screen/UserProfileScreen";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/notes" element={<NotesScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<UserProfileScreen />} />
          <Route path="/create-note" element={<CreateNoteScreen />} />
          <Route path="/update-note/:id" element={<UpdateNoteScreen />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
