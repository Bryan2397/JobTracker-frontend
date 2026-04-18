import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Job } from "../types/Job";
import { useAuth } from "../context/useAuth";
import api from "../utils/api";

const EditJob = () => {
  const { id } = useParams(); // 👈 get job id from URL
  const navigate = useNavigate();
  const user = useAuth();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salary: "",
    url: "",
    location: "",
    dateApplied: "",
    status: "NOT_APPLIED",
    jobSummary: "",
    notes: "",
    skills: [] as string[],
  });

  // ✅ Fetch job on mount
  useEffect(() => {
    const fetchJob = async () => {
      if (!user.getToken()) return;

      try {
        const res = await api.get(`/api/job/${id}`);
        const job: Job = res.data;
        console.log(res.data);
        setFormData({
          title: job.title || "",
          company: job.company || "",
          salary: job.salary || "",
          url: job.jobUrl || "",
          location: job.location || "",
          dateApplied: job.dateApplied || "",
          status: job.status || "NOT_APPLIED",
          jobSummary: job.jobSummary || "",
          notes: job.notes || "",
          skills: job.skills || [],
        });

        setLoading(false);
      } catch (error) {
        console.log("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id, user]);

  // ✅ Handle form change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.getToken()) {
      user.logout();
      alert("Please sign in");
      return;
    }

    try {
      const res = await api.put(`/api/job/${id}`, formData);
      console.log("Updated:", res.data);

      // optional redirect after update
      navigate("/dashboard");
    } catch (error) {
      console.log("Error updating job:", error);
    }
  };

  // ✅ Skills handlers (same as yours)
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;

    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 style={{ marginBottom: "40px" }}>Edit Job</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            name="company"
            className="form-control"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job URL</label>
          <input
            name="url"
            className="form-control"
            value={formData.url}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date Applied</label>
          <input
            type="date"
            name="dateApplied"
            className="form-control"
            value={formData.dateApplied}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="NOT_APPLIED">NOT_APPLIED</option>
            <option value="APPLIED">APPLIED</option>
            <option value="OA">OA</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="OFFER">OFFER</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Summary</label>
          <textarea
            name="jobSummary"
            className="form-control"
            value={formData.jobSummary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            className="form-control"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label d-flex">Skills</label>

          {formData.skills.map((skill, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                className="form-control me-2"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeSkill(index)}
              >
                -
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-success" onClick={addSkill}>
            + Add Skill
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
