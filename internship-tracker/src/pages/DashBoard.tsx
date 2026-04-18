import { useNavigate } from "react-router-dom";
import { Job } from "../types/Job";
import { JobRow } from "../components/JobRow";
import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import api from "../utils/api";

const DashBoard = () => {
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const navigate = useNavigate();
  const user = useAuth();
  const [responseRate, setResponseRate] = useState<number>(0);
  const [rejectionRate, setRejectionRate] = useState<number>(0);
  const [interviewRate, setInterviewRate] = useState<number>(0);

  useEffect(() => {
    async function gettingJobs() {
      try {
        const res = await api.get("/api/job/myJobs");

        if (res.data instanceof Array) {
          setMyJobs(res.data);
        }
        console.log(res.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message.includes("403")) {
            user.logout();
          } else if (error.message.includes("401")) {
            alert("Unauthorized");
            user.logout();
          } else if (error.message.includes("500")) {
            alert("Server error");
          } else {
            alert("Connection error");
          }
        }
      }
    }

    gettingJobs();
  }, []);

  useEffect(() => {
    function getRates(): void {
      let response: number = 0;
      let rejection: number = 0;
      let interview: number = 0;
      for (let i = 0; i < myJobs.length; i++) {
        if (myJobs[i].status === "INTERVIEW") {
          interview++;
        } else if (myJobs[i].status === "REJECTED") {
          rejection++;
        } else if (
          myJobs[i].status !== "APPLIED" &&
          myJobs[i].status !== "NOT_APPLIED"
        ) {
          response++;
        }
        setResponseRate(Math.ceil(response / myJobs.length));
        setRejectionRate(Math.ceil(rejection / myJobs.length));
        setInterviewRate(Math.ceil(interview / myJobs.length));
      }
    }

    getRates();
  }, [myJobs]);

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
      <div className="container my-4">
        <div className="row text-center g-3">
          <div className="col-md-4">
            <div className="p-3 border rounded shadow-sm">
              <h6 className="text-muted">Response Rate</h6>
              <h2 className="fw-bold text-primary">{responseRate}%</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded shadow-sm">
              <h6 className="text-muted">Rejection Rate</h6>
              <h2 className="fw-bold text-danger">{rejectionRate}%</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded shadow-sm">
              <h6 className="text-muted">Interview Rate</h6>
              <h2 className="fw-bold text-success">{interviewRate}%</h2>
            </div>
          </div>
        </div>
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
            {myJobs.map((job) => (
              <JobRow key={job.id} {...job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
