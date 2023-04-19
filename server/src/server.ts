import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bookingRoute from "./routes/booking.routes";

interface MyConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
}

const app = express();
app.use(express.json());

const uri = "mongodb+srv://FannyRosen:test@cluster.wmcbd5h.mongodb.net/test";

const options: MyConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log("Database connection error: ", error);
  });

/* app.get("/api", (req: Request, res: Response) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
}); */

app.get("/", (req: Request, res: Response) => {
  res.send("Check server is running");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

app.use("/bookings", bookingRoute);
