import { ObjectId } from "mongoose";

export interface Customer {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
}
