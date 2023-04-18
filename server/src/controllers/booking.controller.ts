import { Request, Response } from "express";
import { BookingModel } from "../models/Booking.model";
import { statusFailed, statusSuccess } from "./statusMessages";

export const post_newBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    let { date, sittingTime, numberOfPeople, name, email, phone } = req.body;

    const postNewBooking = new BookingModel({
      date,
      sittingTime,
      numberOfPeople,
      /*   clientId: saveCustomerToDB._id, */
    });

    const booking = await postNewBooking.save();

    res.status(200).json({
      status: statusSuccess,
      message: "New booking added to DB",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
