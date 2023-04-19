import {
  BookingData,
  NewBookingData,
  BookingResponse,
} from "../models/BookingData";
import { post } from "./handleAxiosRequests.service";

export async function postBooking(booking: NewBookingData) {
  const url: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  return (await post<BookingResponse, NewBookingData>(url, booking)).data;
}
