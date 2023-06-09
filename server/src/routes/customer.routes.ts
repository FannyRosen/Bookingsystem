import express, { Router } from "express";

import {
  delete_customerByIdController,
  get_bookingByEmail,
  get_customerByIdController,
  get_customerController,
  post_newCustomerController,
  put_customerByIdController,
} from "../controllers/customer.controller";

const router: Router = express.Router();

router.get("/", get_customerController);
router.post("/new", post_newCustomerController);
router.get("/:id", get_customerByIdController);
router.post("/delete/:id", delete_customerByIdController);
router.put("/edit/:id", put_customerByIdController);
router.put("/newcustomer", get_bookingByEmail);

export default router;
