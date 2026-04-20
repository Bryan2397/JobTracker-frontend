import { useEffect, useState } from "react";
import { jobData, User } from "../types/Job";
import { useAuth } from "../context/useAuth";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [description, setDescription] = useState<string>("");
  const [aiCounter, setAiCounter] = useState<number>(0);
  const user = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salary: "",
    jobUrl: "",
    location: "",
    dateApplied: "",
    status: "NOT_APPLIED",
    jobSummary: "",
    notes: "",
    skills: [] as string[],
  });

  useEffect(() => {
    async function getUserInfo() {
      api.post("/api/user/aiTimer");
      try {
        const res = await api.get<User>("/api/user/me");
        setAiCounter(res.data.aiUsage);
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
    getUserInfo();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.getToken() === null) {
      alert("Please Sign in to save jobs");
      return;
    }

    try {
      const res = await api.post("/api/job/save", formData);
      if (res.data === "Successful") {
        alert("Successful");
        navigate("/dashboard");
      } else {
        alert("Error saving job information");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("403")) {
          alert("");
        }
      }
    }
  };

  const handleChatResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    setDescription(description.trim());

    if (user.token === null) {
      alert("Please Sign in to use AI enhancement");
      return;
    }

    try {
      const result = await api.post<jobData>("/api/chat/description", {
        params: {
          description,
        },
      });
      const aiData = result.data;
      setFormData((prev) => ({
        ...prev,
        ...aiData,
        status: "NOT_APPLIED",
        location: aiData.location,
        addedOn: new Date().toISOString(),
      }));
      setAiCounter(aiCounter - 1);
    } catch (error: unknown) {
      console.log(error);
      alert("error in AI extraction");
    }
  };

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

  return (
    <div className="container mt-4">
      <h2 style={{ marginBottom: "40px" }}>Add Job</h2>

      <div className="mb-5">
        <div className="d-flex justify-content-between">
          <label className="d-inline" style={{ fontSize: "30px" }}>
            <strong>Use AI to Save time!!</strong>
          </label>
          <label className="d-inline" style={{ fontSize: "30px" }}>
            <strong> Tries left: {aiCounter}</strong>
          </label>
        </div>
        <textarea
          className="mb-2 mt-3 form-control form-control-lg"
          rows={10}
          placeholder="Place the entire Job description here"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(event.target.value)
          }
        >
          {description}
        </textarea>
        <button
          onClick={handleChatResponse}
          className="d-block btn btn-primary"
          disabled={aiCounter === 0}
        >
          Send to AI
        </button>
      </div>

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
            name="jobUrl"
            type="url"
            className="form-control"
            value={formData.jobUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            required
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
            rows={3}
            value={formData.jobSummary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            className="form-control"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid mb-3">
          <label className="form-label">Skills</label>

          {formData.skills.map((skill, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="Enter a skill (e.g. React, Java, AWS)"
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

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
