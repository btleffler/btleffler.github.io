export interface ContactData {
  name: string,
  phone: string,
  email: string,
}

export interface JobData {
  name: string,
  location: string,
  title: string,
  start: Date,
  end?: Date,
  duties: string[],
  contributions: string[],
}

export interface EducationData {
  name: string,
  degree: string,
  location: string,
}

export interface ResumeData {
  contact: ContactData,
  jobs: JobData[],
  skills: string[],
  education: EducationData,
}
