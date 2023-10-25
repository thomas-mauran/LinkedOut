export type Address = {
  firstLine?: string;
  zipCode?: string;
  city?: string;
};

export type JobCategory = {
  id?: number;
  category?: string;
};

export type Profile = {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: number;
  birthday?: string;
  nationality?: string;
  address?: Address;
  phone?: string;
  email?: string;
  shortBiography?: string;
  deletionRequested?: boolean;
  nbExperiences?: number;
  nbReviews?: number;
  averageRating?: number;
};

export type Availability = {
  id?: number;
  startDate?: string;
  endDate?: string;
  address?: Address;
  category?: JobCategory;
  range?: number;
};

export interface Company {
  id?: number;
  name?: string;
}

export interface Job {
  id?: number;
  title?: string;
  category?: JobCategory;
}

export interface Experience {
  id?: number;
  startDate?: string;
  endDate?: string;
  address?: Address;
  company?: Company;
  job?: Job;
}

export interface Reference {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: string;
  company?: Company;
}

export interface Evaluation {
  id?: number;
  employerFirstName?: string;
  employerLastName?: string;
  score?: number;
  review?: string;
  createdAt?: string;
}
