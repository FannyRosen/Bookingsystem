import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BookingData, bookingsDefaultValue } from "../models/BookingData";
import { CustomerData, customersDefaultValue } from "../models/CustomerData";
import { fetchBookingByID } from "../services/handleBookingsFetch.service";
import { fetchCustomerByID } from "../services/handleCustomersFetch.service";
import { BookingDeleteButton } from "./admin/BookingDeleteButton";
import { SingleBookingRender } from "./admin/SingleBookingRender";
import { UpdateBooking } from "./admin/UpdateBooking";

export const SingleBooking = () => {
  const [booking, setBooking] = useState<BookingData>(bookingsDefaultValue);
  const [customer, setCustomer] = useState<CustomerData>(customersDefaultValue);
  const [inEdit, setInEdit] = useState(false);

  let params = useParams();
  const location = useLocation();
  const adminPath = location.pathname === "/admin/" + params.id;
  const guestPath = location.pathname === "/reservation/" + params.id;

  useEffect(() => {
    const getBooking = async () => {
      const bookingResponse = await fetchBookingByID(params.id!);
      setBooking(bookingResponse.data);
    };
    getBooking();
  }, [inEdit]);

  useEffect(() => {
    if (booking._id !== "") {
      fetchCustomerByID(booking.clientId!.toString()).then(
        async (customerByIdResponse) => {
          setCustomer(customerByIdResponse.data);
        }
      );
    }
  }, [booking]);

  return (
    <>
      {adminPath ? (
        <>
          {inEdit ? (
            <>
              <UpdateBooking onClick={() => setInEdit(false)} />

              <button onClick={() => setInEdit(false)}>Back</button>
            </>
          ) : (
            <div>
              <SingleBookingRender
                booking={booking}
                customer={customer}
              ></SingleBookingRender>
              <div>
                <button className="editbutton" onClick={() => setInEdit(true)}>
                  Edit
                </button>

                <BookingDeleteButton
                  adminPath={adminPath}
                  guestPath={guestPath}
                  booking={booking}
                ></BookingDeleteButton>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {guestPath ? (
            <>
              <SingleBookingRender
                booking={booking}
                customer={customer}
              ></SingleBookingRender>

              <BookingDeleteButton
                adminPath={adminPath}
                guestPath={guestPath}
                booking={booking}
              ></BookingDeleteButton>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
