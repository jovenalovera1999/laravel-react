import axios from "axios";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import Navbar from "../components/Navbar";

interface Errors {
  first_name?: string[];
  middle_name?: string[];
  last_name?: string[];
}

function CreateStudent() {
  const [state, setState] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    errors: {} as Errors,
  });

  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  useEffect(() => {
    document.title = "Create Student";
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveStudent = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("auth_token");

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .post("http://127.0.0.1:8000/api/student/store", state, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setToastMessage("Student successfully added.");
          setToastMessageSuccess(true);
          setToastMessageVisible(true);

          setState((prevState) => ({
            ...prevState,
            first_name: "",
            middle_name: "",
            last_name: "",
            errors: {},
          }));
        } else {
          console.error("Unexpected status code: ", res.data.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status == 401) {
          navigate("/", {
            state: {
              message: "Unauthorized, please login your valid credentials!",
              success: false,
            },
          });
        } else if (error.response && error.response.data.errors) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
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
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Student Form</h5>
          <Link to={"/students"} className="btn btn-primary">
            Students List
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={handleSaveStudent}>
            <div className="mb-3">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.first_name ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.first_name}
                name="first_name"
                id="first_name"
              />
              {state.errors.first_name && (
                <p className="text-danger">{state.errors.first_name[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.middle_name ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.middle_name}
                name="middle_name"
                id="middle_name"
              />
              {state.errors.middle_name && (
                <p className="text-danger">{state.errors.middle_name[0]}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.last_name ? "is-invalid" : ""
                }`}
                onChange={handleInput}
                value={state.last_name}
                name="last_name"
                id="last_name"
              />
              {state.errors.last_name && (
                <p className="text-danger">{state.errors.last_name[0]}</p>
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

export default CreateStudent;
