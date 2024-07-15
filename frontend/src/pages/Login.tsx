import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

interface Errors {
  username?: string[];
  password?: string[];
}

function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
    errors: {} as Errors,
  });

  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    await axios
      .post("http://127.0.0.1:8000/api/user/process/login", state, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setState((prevState) => ({
            ...prevState,
            username: "",
            password: "",
            errors: {},
          }));

          navigate("/students");
        } else {
          setToastMessage("Incorrect Username or Password, Please try again.");
          setToastMessageSuccess(false);
          setToastMessageVisible(true);

          console.error("Unexpected status code: ", res.data.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          console.error("Unexpected error: ", error);
        }
      });
  };

  return (
    <>
      <ToastMessage
        message={toastMessage}
        success={toastMessageSuccess}
        visible={toastMessageVisible}
        onClose={() => setToastMessageVisible(false)}
      />
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="card col-sm-6 mt-3">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <h5 className="card-title mb-3">Login Authentication</h5>
                <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className={`form-control ${
                      state.errors.username ? "in-valid" : ""
                    }`}
                    name="username"
                    id="username"
                    value={state.username}
                    onChange={handleInput}
                  />
                  {state.errors.username && (
                    <p className="text-danger">{state.errors.username}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      state.errors.password ? "in-valid" : ""
                    }`}
                    name="password"
                    id="password"
                    value={state.password}
                    onChange={handleInput}
                  />
                  {state.errors.password && (
                    <p className="text-danger">{state.errors.password}</p>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
