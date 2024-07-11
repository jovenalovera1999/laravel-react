import React, { ChangeEvent, FormEvent, useState } from "react";

interface Errors {
  username?: string[];
  password?: string[];
}

function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
    error: {} as Errors,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="card col-sm-6 mt-3">
            <div className="card-body">
              <h5 className="card-title mb-3">Login Authentication</h5>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={state.username}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={handleInput}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
