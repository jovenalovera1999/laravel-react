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
  }>({
    students: [],
    loading: true,
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "List of Students";

    const loadStudents = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/students");

      if (res.data.status == 200) {
        setState({
          students: res.data.students,
          loading: false,
        });
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    loadStudents();
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {};

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
        </div>
      </div>
    </>
  );
}

export default Student;
