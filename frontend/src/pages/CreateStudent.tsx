import axios from "axios";
import { ChangeEvent, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

function CreateStudent() {
  const [state, setState] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveStudent = async (e: FormEvent) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/api/store/student",
      state
    );

    if (res.data.status == 200) {
      setState({
        first_name: "",
        middle_name: "",
        last_name: "",
      });
    }
  };

  return (
    <>
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Student Form</h5>
          <Link to={"/"} className="btn btn-primary">
            Students List
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={saveStudent}>
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

export default CreateStudent;
