import { useState } from "react";
import { Job } from "../types/Job";
import { useNavigate } from "react-router-dom";

export const JobRow = (job: Job) => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "badge bg-primary";
      case "OA":
        return "badge bg-dark";
      case "INTERVIEW":
        return "badge bg-info";
      case "OFFER":
        return "badge bg-success";
      case "REJECTED":
        return "badge bg-danger";
      case "NOT_APPLIED":
        return "badge bg-warning";
    }
    return "";
  };

  function deleteJob(id: number) {
    console.log("can delete");
    console.log(id);
  }

  return (
    <>
      <tr>
        <td>{job.company}</td>
        <td>{job.title}</td>
        <td>{job.skills.toLocaleString()}</td>
        <td>{job.location}</td>

        <td>
          <button
            className={getStatusClass(job.status) + " dropdown-toggle"}
            data-bs-toggle="dropdown"
            style={{ color: "white" }}
          >
            {job.status}
          </button>
        </td>
        <td>{job.salary}</td>
        <td>{job.dateApplied}</td>
        <td>{job.addedOn}</td>

        <td
          style={{
            maxWidth: "400px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
          {show && job.notes}
        </td>
        <td
          style={{
            maxWidth: "400px",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hide" : "Open"}
          </button>
          {open && job.jobSummary}
        </td>
        <td>
          <a href={job.url}>LINK</a>
        </td>
        <td>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => navigate(`/edit/${job.id}`, { state: job })}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteJob(job.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
