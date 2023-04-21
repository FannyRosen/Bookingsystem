import { Link } from "react-router-dom";
import { BookingData } from "../../models/BookingData";
import { CustomerData } from "../../models/CustomerData";

interface RenderData {
  booking: BookingData;
  customer: CustomerData;
}

export const SingleBookingRender = (props: RenderData) => {
  return (
    <div>
      <div>
        <Link to="/admin">
          <button>Back to all bookings</button>
        </Link>
        <p>Customer: {props.customer.name}</p>
        <p>Email: {props.customer.email}</p>
        <p>Phone: {props.customer.phone}</p>
      </div>
      <div>
        <p>
          Date of sitting:
          {new Date(props.booking.date).toLocaleDateString()}
        </p>
        <p>
          Which sitting: {props.booking.sittingTime === 1 ? "6.00pm" : "9.00pm"}
        </p>
        <p>Number of guests: {props.booking.numberOfPeople}</p>
      </div>
    </div>
  );
};
