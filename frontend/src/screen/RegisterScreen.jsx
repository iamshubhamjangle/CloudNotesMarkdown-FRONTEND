import ErrorAlert from "components/ErrorAlert";
import { CheckMark, Cloud, Failed } from "components/icons";
import Loading from "components/Loading";
import MainHeader from "components/MainHeader";
import { register, setRegistrationError } from "features/user/registerSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picError, setPicError] = useState("");
  const [picStatus, setPicStatus] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registrationError, isLoading } = useSelector(
    (store) => store.register
  );
  const { userInfo } = useSelector((store) => store.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
      return;
    }
  }, [userInfo]);

  /**
   * Register request handler
   * @param {requestBody} e
   * @returns void
   */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setRegistrationError("Your passwords don't match!"));
      return;
    }

    dispatch(register({ name, email, password, pic }));
  };

  /**
   * Register request handler
   * @param {pics} e.target.files[0]
   * @returns void
   */
  const postDetails = (pics) => {
    if (pics && (pics.type === "image/jpeg" || pics.type === "image/png")) {
      setPicStatus("uploading");
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "cloudnotes");
      data.append("cloud_name", "imshubham");
      fetch("https://api.cloudinary.com/v1_1/imshubham/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          setPicStatus("uploaded");
          return res.json();
        })
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          setPicStatus("error");
        });
    } else {
      return setPicError("Please Select an Image!");
    }
  };

  return (
    <MainHeader title="Register">
      <div id="login-div" className="row justify-content-center">
        <form className="col-10 col-lg-8" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              aria-describedby="nameField"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="*********"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="*********"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Pick a profile image
            </label>
            <div className="d-flex">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Pick a profile picture"
                  type="file"
                  id="formFile"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <div className="col-2 col-md-1">
                {!picStatus && (
                  <Cloud
                    className="d-flex justify-content-end"
                    color="dodgerblue"
                  />
                )}
                {picStatus === "uploading" && (
                  <Loading
                    className="d-flex justify-content-end"
                    color="dodgerblue"
                  />
                )}
                {picStatus === "uploaded" && (
                  <CheckMark
                    className="d-flex justify-content-end"
                    color="dodgerblue"
                  />
                )}
                {picStatus === "error" && (
                  <Failed className="d-flex justify-content-end" color="red" />
                )}
              </div>
            </div>
          </div>
          {isLoading && (
            <button
              className="btn btn-primary"
              style={{ minWidth: "100px" }}
              disabled
            >
              <Loading
                className="d-flex justify-content-center"
                color="dodgerblue"
              />
            </button>
          )}
          {!isLoading && <button className="btn btn-primary">Register</button>}
          {registrationError && <ErrorAlert children={registrationError} />}
          {picError && <ErrorAlert children={picError} />}

          <div className="form-text my-3">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Already have an account? Signin
            </Link>
          </div>
        </form>
      </div>
    </MainHeader>
  );
}

export default RegisterScreen;
