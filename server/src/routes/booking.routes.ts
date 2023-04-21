import express, { Router } from "express";

import {
  delete_bookingByIdController,
  get_bookingByIdController,
  get_bookingsController,
  post_newBookingsController,
} from "../controllers/booking.controller";

const router: Router = express.Router();

router.get("/", get_bookingsController);
router.post("/new", post_newBookingsController);
router.get("/:id", get_bookingByIdController);
router.post("/delete/:id", delete_bookingByIdController);
router.put("/edit/:id", get_bookingByIdController);

export default router;
