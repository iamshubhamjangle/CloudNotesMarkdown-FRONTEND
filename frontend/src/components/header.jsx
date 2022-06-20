import { setSearchBarText } from "features/notes/noteSlice";
import { logout } from "features/user/userSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Cloud, Search } from "./icons";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.user);

  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchBarText(search));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Cloud>
            <span className="align-middle d-lg-none fw-bold"> MDCN</span>
            <span className="align-middle d-none d-lg-inline fw-bold">
              {" "}
              Markdown CloudNotes
            </span>
          </Cloud>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="navbar-collapse justify-content-end text-center collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav fw-bolder d-flex align-items-center">
            {!userInfo && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
            {userInfo && (
              <>
                <li className="nav-item">
                  <div style={{ minWidth: "max-content" }}>
                    <Link to="/notes" className="nav-link">
                      My Notes
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hello {userInfo.name}!
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link to="/profile">
                        <div className="dropdown-item">Profile</div>
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => logoutHandler()}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  ></input>
                  <button
                    className="input-group-text btn"
                    onClick={submitHandler}
                  >
                    <Search />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
