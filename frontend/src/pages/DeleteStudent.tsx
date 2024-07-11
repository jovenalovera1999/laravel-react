import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

function DeleteStudent() {
  const { student_id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState(false);
  const [toastMessageVisible, setToastMessageVisible] = useState(false);

  useEffect(() => {
    document.title = "Delete Student";

    const fetchStudent = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/student/delete/${student_id}`
      );

      if (res.data.status == 200) {
        const { first_name, middle_name, last_name } = res.data.student;
        setState({ first_name, middle_name, last_name });
      }
    };

    fetchStudent();
  }, [student_id]);

  const handleStudentDelete = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .delete(`http://127.0.0.1:8000/api/student/destroy/${student_id}`, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setToastMessage("Student successfully deleted.");
          setToastMessageSuccess(true);
          setToastMessageVisible(true);

          setState((prevState) => ({
            ...prevState,
            errors: {},
          }));

          setTimeout(() => {
            navigate("/students");
          }, 1500);
        } else {
          console.error("Unexpected code status: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting student: ", error);
      });
  };

  const handleFullName = () => {
    return state.middle_name
      ? `${state.first_name} ${state.middle_name[0]}. ${state.last_name}`
      : `${state.first_name} ${state.last_name}`;
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
        <div className="card-body">
          <h5 className="card-title">Delete Student</h5>
          <p>
            Are you sure do you want to delete this student name "
            {handleFullName()}" ?
          </p>
          <form onSubmit={handleStudentDelete}>
            <div className="d-flex justify-content-end">
              <Link to={"/students"} className="btn btn-secondary me-1">
                No
              </Link>
              <button type="submit" className="btn btn-danger">
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteStudent;
