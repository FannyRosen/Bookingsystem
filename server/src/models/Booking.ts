import { ObjectId } from "mongoose";

export interface Booking {
  _id: ObjectId;
  date: Date;
  numberOfPeople: number;
  sittingTime: number;
  clientId: ObjectId;
}
