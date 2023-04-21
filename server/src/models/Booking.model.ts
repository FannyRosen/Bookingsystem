import mongoose from "mongoose";
import { Booking } from "./Booking";

const BookingSchema = new mongoose.Schema<Booking>({
  date: {
    type: Date,
    // required: true,
  },
  sittingTime: {
    type: Number,
    // required: true,
  },
  numberOfPeople: {
    type: Number,
    // required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    // required: true,
  },
});

export const BookingModel = mongoose.model<Booking>("Bookings", BookingSchema);
