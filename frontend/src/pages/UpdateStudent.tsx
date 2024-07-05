import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";

function UpdateStudent() {
  const { student_id } = useParams();
  const [state, setState] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  useEffect(() => {
    document.title = "Update Student";

    const fetchStudent = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/student/edit/${student_id}`
      );

      if (res.data.status == 200) {
        const { first_name, middle_name, last_name } = res.data.student;
        setState({ first_name, middle_name, last_name });
      }
    };

    fetchStudent();
  }, [student_id]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveStudentChanges = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    const res = await axios.put(
      `http://127.0.0.1:8000/api/student/update/${student_id}`,
      state,
      { headers: { "X-CSRF-TOKEN": csrfToken } }
    );

    if (res.data.status == 200) {
      setToastMessage("Student successfully saved!");
      setToastMessageSuccess(true);
      setToastMessageVisible(true);
    }
  };

  return (
    <>
      <ToastMessage
        message={toastMessage}
        success={toastMessageSuccess}
        visible={toastMessageVisible}
        onClose={() => setToastMessageVisible(false)}
      />
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Student Form</h5>
          <Link to={"/"} className="btn btn-primary">
            Students List
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={saveStudentChanges}>
            <div className="mb-3">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleInput}
                value={state.first_name}
                name="first_name"
                id="first_name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleInput}
                value={state.middle_name}
                name="middle_name"
                id="middle_name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleInput}
                value={state.last_name}
                name="last_name"
                id="last_name"
              />
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

export default UpdateStudent;
