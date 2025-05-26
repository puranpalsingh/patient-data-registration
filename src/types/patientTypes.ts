export interface PatientFormData {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address?: string;
    emergencyName: string;
    emergencyPhone: string;
    allergies?: string;
    medications?: string;
}
  