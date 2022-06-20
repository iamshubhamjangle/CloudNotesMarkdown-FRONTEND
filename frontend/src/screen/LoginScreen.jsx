import ErrorAlert from "components/ErrorAlert";
import Loading from "components/Loading";
import MainHeader from "components/MainHeader";
import { login, resetErrors } from "features/user/loginSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginError, isLoading } = useSelector((store) => store.login);
  const { userInfo } = useSelector((store) => store.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
      return;
    }
    dispatch(resetErrors());
  }, [userInfo]);

  /**
   * Dispatches a action to login api
   * If fullfilled saves the userData to localStorage
   * If rejected does noting
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <MainHeader title="Login">
      <div id="login-div" className="row justify-content-center">
        <form className="col-10 col-lg-8" onSubmit={submitHandler}>
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
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          {!isLoading && <button className="btn btn-primary">Login</button>}
          {loginError && <ErrorAlert children={loginError} />}
        </form>
      </div>
    </MainHeader>
  );
}

export default LoginScreen;
