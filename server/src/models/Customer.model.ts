import mongoose from "mongoose";
import { Customer } from "./Customer";

const CustomerSchema = new mongoose.Schema<Customer>({
  name: {
    type: String,
    lowercase: true,
    // required: true,
  },
  email: {
    type: String,
    lowercase: true,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
});

export const CustomerModel = mongoose.model<Customer>(
  "Customers",
  CustomerSchema
);
