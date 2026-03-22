import { useNavigate } from "react-router-dom";
import { Job } from "../types/Job";
import { JobRow } from "./JobRow";
import { useAuth } from "../context/useAuth";

const DashBoard = () => {
  const allJobs: Job[] = [];
  const navigate = useNavigate();
  const user = useAuth();
  console.log(user.email);
  console.log(user.token);

  allJobs.push({
    id: 1,
    url: "https://www.linkedin.com/jobs/search-results/?currentJobId=4359236722&keywords=software%20engineer%20intern&origin=SUGGESTION",
    company: "NYSISO",
    addedOn: new Date().toLocaleDateString(),
    status: "NOT_APPLIED",
    notes: "Apply soon",
    title: "Software Engineer Intern",
    location: "Albany",
    dateApplied: "",
    dateResponded: "",
    jobSummary:
      "Majoring in Engineering, Computer Science, or a related field \n Familiarity with one or more of the following: Python, Java, Javascript, SQL Currently attending college in the U.S.",
    salary: "$25",
    skills: ["Java", "TypeScript"],
  });

  return (
    <div className="container">
      <div className=" " style={{ width: "100%" }}>
        <button
          type="button"
          className="btn btn-primary mt-5"
          style={{
            height: "50px",
            width: "170px",
            fontSize: "24px",
            display: "flex",
            paddingBottom: "20px",
          }}
          onClick={() => navigate("/add")}
        >
          Add new Job
        </button>
      </div>
      <div className="container mt-5" style={{ overflow: "auto" }}>
        <h2 className="mb-4">Job applications</h2>

        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Skills</th>
              <th>Location</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Applied On</th>
              <th>Added On</th>
              <th>Notes</th>
              <th>Job Summary</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((job) => (
              <JobRow key={job.id} {...job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
