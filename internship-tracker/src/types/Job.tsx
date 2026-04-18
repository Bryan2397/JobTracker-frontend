export interface Job {
  id: number;
  title: string;
  jobUrl: string;
  dateApplied?: string | "";
  company: string;
  dateAdded: string;
  status: "APPLIED" | "OA" | "INTERVIEW" | "OFFER" | "REJECTED" | "NOT_APPLIED";
  notes?: string;
  jobSummary: string;
  location?: string;
  salary?: string;
  skills: string[];
}

export interface jobData {
  company: string;
  title: string;
  location: string;
  salary: string;
  skills: string[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  aiUsage: number;
  aiResetDate: string;
}
