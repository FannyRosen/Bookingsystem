import { Request, Response } from "express";
import { CustomerModel } from "../models/Customer.model";

import { statusFailed, statusSuccess } from "./statusMessages";

export function postNewCustomer(req: Request, res: Response) {
  let { name, email, phone } = req.body;
  const postNewCustomer = new CustomerModel({
    name: name,
    email: email,
    phone: phone,
  });

  const saveCustomerToDB = postNewCustomer.save();

  res.status(200).json({
    status: statusSuccess,
    message: "post new customer working",
    data: saveCustomerToDB,
  });
}

export const get_customerController = async (req: Request, res: Response) => {
  const customer = await CustomerModel.find();

  try {
    res.status(200).json({
      status: statusSuccess,
      data: customer,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const post_newCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    postNewCustomer(req, res);
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const get_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const customerById = await CustomerModel.findById(req.params.id);

    res.status(200).json({
      status: statusSuccess,
      message: "Get customer id works",
      data: customerById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const delete_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const deleteCustomer = await CustomerModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: statusSuccess,
      message: "Delete id works",
      data: deleteCustomer,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const put_customerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const editById = await CustomerModel.findByIdAndUpdate(req.params.id);
    /* 
    editById.name = req.body.name;
    editById.email = req.body.email;
    editById.phone = req.body.phone; */

    res.status(200).json({
      status: statusSuccess,
      message: "Edit id works",
      data: editById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};

export const get_bookingByEmail = async (req: Request, res: Response) => {
  try {
    const bookingById = await CustomerModel.findOne(req.params);

    res.status(200).json({
      status: statusSuccess,
      message: "Get id works",
      data: bookingById,
    });
  } catch (error: any) {
    res.status(500).json({
      status: statusFailed,
      message: error,
    });
  }
};
