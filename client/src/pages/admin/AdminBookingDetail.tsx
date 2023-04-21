import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingData } from "../../models/BookingData";

interface BookingDetail {
  bookings: BookingData[];
}

export const AdminBookingDetail = (props: BookingDetail) => {
  const [openBookings, setOpenBookings] = useState(false);
  return (
    <>
      <div>
        <button
          id="viewbookings"
          onClick={() => setOpenBookings(!openBookings)}
        >
          {openBookings ? <>CLOSE</> : <>VIEW BOOKINGS</>}
        </button>
        {props.bookings.length > 0 ? (
          <>
            <p>{props.bookings.length} reservations</p>
          </>
        ) : (
          <>
            <p className="nobookings">Currently no reservations</p>
          </>
        )}
        {openBookings && (
          <>
            <div>
              {props.bookings.map((booking) => {
                let date = new Date(booking.date);
                return (
                  <div key={booking._id}>
                    <Link to={"/admin/" + booking._id}>
                      <p> Date: {date.toLocaleDateString()}</p>
                    </Link>
                    <p>Sitting: {booking.sittingTime}</p>
                    <p>Guests: {booking.numberOfPeople}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
