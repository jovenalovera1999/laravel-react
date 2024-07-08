import { Link } from "react-router-dom";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Students {
  student_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
}

function Student() {
  const [state, setState] = useState<{
    students: Students[];
    loading: boolean;
    currentPage: number;
    lastPage: number;
  }>({
    students: [],
    loading: true,
    currentPage: 1,
    lastPage: 1,
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "List of Students";
    loadStudents();
  }, [state.currentPage, searchQuery]);

  const loadStudents = async () => {
    let url = `http://127.0.0.1:8000/api/students?page=${state.currentPage}`;
    if (searchQuery) {
      url = `http://127.0.0.1:8000/api/students/search?page=${state.currentPage}&query=${searchQuery}`;
    }

    const res = await axios.get(url);

    if (res.data.status == 200) {
      setState((prevState) => ({
        ...prevState,
        students: res.data.students.data,
        loading: false,
        currentPage: res.data.students.current_page,
        lastPage: res.data.students.last_page,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const handlePageChange = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setState((prevState) => ({
      ...prevState,
      currentPage: 1,
    }));
  };

  return (
    <>
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Students List</h5>
          <Link to={"/student/create"} className="btn btn-primary">
            Add Student
          </Link>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="d-flex justify-content-end">
            <div className="btn-group mb-3">
              <button
                className="btn btn-primary"
                disabled={state.currentPage <= 1}
                onClick={() => handlePageChange(state.currentPage - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={state.currentPage >= state.lastPage}
                onClick={() => handlePageChange(state.currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Action</th>
              </thead>
              <tbody>
                {state.loading ? (
                  <tr>
                    <td colSpan={3}>
                      <h2 className="ms-3">Loading...</h2>
                    </td>
                  </tr>
                ) : (
                  state.students.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.first_name}</td>
                      <td>{student.middle_name}</td>
                      <td>{student.last_name}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/student/edit/${student.student_id}`}
                            className="btn btn-success"
                          >
                            Update
                          </Link>
                          <Link
                            to={`/student/delete/${student.student_id}`}
                            className="btn btn-danger"
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <div className="btn-group">
              <button
                className="btn btn-primary"
                disabled={state.currentPage <= 1}
                onClick={() => handlePageChange(state.currentPage - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={state.currentPage >= state.lastPage}
                onClick={() => handlePageChange(state.currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
