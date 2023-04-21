import {
  BookingData,
  NewBookingData,
  BookingResponse,
  BookingsResponse,
} from "../models/BookingData";

import { axiosDelete, get, post, put } from "./handleAxiosRequests.service";

export async function fetchBookings(): Promise<BookingsResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}`;
  return (await get<BookingsResponse>(url)).data;
}

export async function postBooking(booking: NewBookingData) {
  // http://localhost:8000/bookings/new
  const url: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  console.log(url);

  return (await post<BookingResponse, NewBookingData>(url, booking)).data;
}

export async function fetchBookingByID(id: string): Promise<BookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + id;
  return (await get<BookingResponse>(url)).data;
}

export async function deleteBooking(id: string): Promise<BookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_DELETE}/` + id;
  return (await axiosDelete<BookingResponse>(url)).data;
}

export async function editBooking(
  id: string,
  booking: BookingData
): Promise<BookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_EDIT}/` + id;
  return (await put<BookingResponse, BookingData>(url, booking)).data;
}

export async function findBookingByEmail(
  email: string
): Promise<BookingResponse> {
  const url: string = `${process.env.REACT_APP_BOOKINGS_URI}/` + email;
  return (await get<BookingResponse>(url)).data;
}
