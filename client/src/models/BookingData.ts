import { CustomerData } from "./CustomerData";

export interface BookingData {
  _id?: string;
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  clientId?: CustomerData;
}

export interface NewBookingData {
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  name: string;
  email: string;
  phone: string;
}

export interface BookingResponse {
  data: BookingData;
}

export interface BookingsResponse {
  data: BookingData[];
}
