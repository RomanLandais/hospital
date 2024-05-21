export interface Doctor {
  last_name: string;
  name: string;
  specialty: string;
}

export interface Schedule {
  consultDate: string;
  doctor: string;
  patients: string[];
}
