export interface Address {
  firstLine: string;
  zipCode: string;
  city: string;
}

export interface JobCategory {
  id: number;
  category: string;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  gender: number;
  birthday: string;
  nationality: string;
  address: Address;
  phone: string;
  email: string;
  shortBiography: string;
  deletionRequested: boolean;
  nbExperiences: number;
  nbReviews: number;
  averageRating: number;
}

export interface Availability {
  id: number;
  startDate: string;
  endDate: string;
  address: Address;
  jobCategory: JobCategory;
  range: number;
}

export interface Company {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  title: string;
  category: JobCategory;
}

export interface Experience {
  id: number;
  startDate: string;
  endDate: string;
  address: Address;
  company: Partial<Company>;
  job: Partial<Job>;
}

export interface Reference {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  email: string;
  phone: string;
  company: Partial<Company>;
}

export interface Evaluation {
  id: number;
  employerFirstName: string;
  employerLastName: string;
  score: number;
  review: string;
  createdAt: string;
}
