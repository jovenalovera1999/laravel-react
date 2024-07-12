import axios from "axios";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import Navbar from "../components/Navbar";

interface Errors {
  name?: string[];
  username?: string[];
  password?: string[];
}

function CreateUser() {
  const [state, setState] = useState({
    name: "",
    username: "",
    password: "",
    errors: {} as Errors,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  useEffect(() => {
    document.title = "Create User";
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveUser = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .post("http://127.0.0.1:8000/api/user/store", state, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setToastMessage("User successfully added.");
          setToastMessageSuccess(true);
          setToastMessageVisible(true);

          setState((prevState) => ({
            ...prevState,
            name: "",
            username: "",
            password: "",
            errors: {},
          }));
        } else {
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
      <Navbar />
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-start">
          <h5 className="card-title">User Form</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSaveUser}>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.name ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.name}
                name="name"
                id="name"
              />
              {state.errors.name && (
                <p className="text-danger">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.username ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.username}
                name="username"
                id="username"
              />
              {state.errors.username && (
                <p className="text-danger">{state.errors.username[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${
                  state.errors.password ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.password}
                name="password"
                id="password"
              />
              {state.errors.password && (
                <p className="text-danger">{state.errors.password[0]}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary float-end">
              Save Student
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
