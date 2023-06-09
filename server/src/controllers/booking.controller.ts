import { Request, Response } from "express";
import { BookingModel } from "../models/Booking.model";
import { CustomerModel } from "../models/Customer.model";
import { statusFailed, statusSuccess } from "./statusMessages";

export const get_bookingsController = async (req: Request, res: Response) => {
  const bookings = await BookingModel.find();

  try {
    res.status(200).json({
      status: statusSuccess,
      message: "Hämta alla bokningar fungerar",
      data: bookings,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const post_newBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    let { date, sittingTime, numberOfPeople, name, email, phone } = req.body;

    /*let checkBookings = await BookingModel.find({
      date,
      sittingTime,
    }).lean();

    let maximumNumberOfBookings: number = 2;
    let tables: number = checkBookings.length;
    for (let i = 0; i < checkBookings.length; i++) {
      if (checkBookings[i].numberOfPeople > 6) {
        tables = tables + 1;
      }
    }

    if (
      tables >= maximumNumberOfBookings ||
      (numberOfPeople > 6 && tables >= maximumNumberOfBookings - 1)
    ) {
      return res.status(500).json({
        status: statusFailed,
        message: "FULLY BOOKED",
      });
    } */

    const returningCustomer = await CustomerModel.findOne({
      email,
      phone,
    });

    if (returningCustomer) {
      const saveCustomerId = await returningCustomer.save();
      const postNewBooking = new BookingModel({
        date,
        sittingTime,
        numberOfPeople,
        clientId: saveCustomerId._id,
      });

      const booking = await postNewBooking.save();
      /*  sendConfirmationEmail(booking, returningCustomer); */

      res.status(200).json({
        status: statusSuccess,
        message: "New booking added to DB",
        data: booking,
      });
    } else {
      const postCustomer = new CustomerModel({
        name,
        email,
        phone,
      });

      const saveCustomerToDB = await postCustomer.save();

      const postNewBooking = new BookingModel({
        date,
        sittingTime,
        numberOfPeople,
        clientId: saveCustomerToDB._id,
      });

      const booking = await postNewBooking.save();
      /* sendConfirmationEmail(booking, postCustomer); */

      res.status(200).json({
        status: statusSuccess,
        message: "New booking added to DB",
        data: booking,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const get_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingById = await BookingModel.findById(req.params.id);

    res.status(200).json({
      status: statusSuccess,
      message: "Find by id works",
      data: bookingById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const delete_bookingByIdController = async (
  req: Request,
  res: Response
) => {
  const deleteBooking = await BookingModel.findByIdAndDelete(req.params.id);

  const findCustomer = await CustomerModel.findOne(req.body.email);

  /* sendCancelBookingEmail(deleteBooking, findCustomer); */

  try {
    res.status(200).json({
      status: statusSuccess,
      message: "Delete booking works",
      data: deleteBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
