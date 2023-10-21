export type Address = {
  firstLine: string;
  zipCode: string;
  city: string;
};

export type Profile = {
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
};
