import { Cloud } from "components/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import hero from "./hero.png";

function HomeScreen() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
      return;
    }
  }, [userInfo]);

  return (
    <>
      <div
        className="row align-items-center text-center"
        style={{ height: "85vh" }}
      >
        <div className="col-12 col-lg-6">
          <div className="fs-1 fw-bold">Welcome to Markdown CloudNotes!</div>
          <div className="fs-4 fw-normal">One place for all your notes.</div>
          <div className="fs-4 fw-normal lh-1">Stored in Cloud.</div>
          <div className="row justify-content-center">
            <Link
              to="/login"
              className="btn btn-primary btn-rounded col-4 m-3 fw-bold"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="btn btn-outline-primary btn-rounded col-4 m-3 fw-bold"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <img
            src={hero}
            alt="notes_zipper_side_banner"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
