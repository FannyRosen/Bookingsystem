import express, { Router } from "express";

import { post_newBookingsController } from "../controllers/booking.controller";

const router: Router = express.Router();

router.post("/new", post_newBookingsController);
export default router;
