export interface Doctor {
  lastName: string;
  firstName: string;
  specialty: string;
}

export interface Schedule {
  consultDate: string;
  doctor: string;
  patients: string[];
}
