export interface APIError {
  message: string;
}

export interface ProfileUpdateResponse {
  name: string;
  email: string;
  pictrue: string;
  email_verified: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export type ModuleOrder = "up" | "down";
