import axios from "axios";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import Navbar from "../components/Navbar";

interface Genders {
  gender_id: number;
  gender: string;
}

interface Errors {
  name?: string[];
  age?: string[];
  gender?: string[];
  birth_date?: string[];
  username?: string[];
  password?: string[];
}

function CreateUser() {
  const [state, setState] = useState({
    genders: [] as Genders[],
    name: "",
    age: "",
    gender: "",
    birth_date: "",
    username: "",
    password: "",
    errors: {} as Errors,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  useEffect(() => {
    document.title = "Create User";
    handleFetchGenders();
  }, []);

  const handleFetchGenders = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/genders")
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
            name: "",
            age: "",
            gender: "",
            birth_date: "",
            username: "",
            password: "",
            errors: {} as Errors,
          }));
        } else {
          console.error("Unexpected code status: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected error in fetching genders: ", error);
      });
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            age: "",
            gender: "",
            birth_date: "",
            username: "",
            password: "",
            errors: {} as Errors,
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
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.age ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.age}
                name="age"
                id="age"
              />
              {state.errors.age && (
                <p className="text-danger">{state.errors.age[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                className={`form-control ${
                  state.errors.gender ? "is-invalid" : ""
                }`}
                onChange={handleInput}
              >
                <option value="" selected>
                  N/A
                </option>
                {state.genders.map((gender) => (
                  <option value={gender.gender_id}>{gender.gender}</option>
                ))}
              </select>
              {state.errors.gender && (
                <p className="text-danger">{state.errors.gender[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                className={`form-control ${
                  state.errors.birth_date ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.birth_date}
                name="birth_date"
                id="birth_date"
              />
              {state.errors.birth_date && (
                <p className="text-danger">{state.errors.birth_date[0]}</p>
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
