import { Link } from "react-router-dom";

function Student() {
  return (
    <>
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Students List</h5>
          <Link to={"/create/student"} className="btn btn-primary">
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
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
