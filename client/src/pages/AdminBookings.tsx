import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookingData } from "../models/BookingData";
import { CustomerData } from "../models/CustomerData";
import { fetchBookings } from "../services/handleBookingsFetch.service";
import { fetchCustomers } from "../services/handleCustomersFetch.service";
import { AdminBookingDetail } from "./admin/AdminBookingDetail";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchCustomers()
      .then(async (customerResponse) => {
        setCustomers(customerResponse.data);
        const bookingResponse = await fetchBookings();
        setBookings(bookingResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Link to={"/admin/customers"}>
        <span>See all customers</span>
      </Link>
      <input
        id="input"
        type="text"
        placeholder="Search guest..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {customers
        .filter((item) => {
          if (!searchValue) return true;
          if (item.email.includes(searchValue.toLowerCase())) {
            return true;
          }
          return false;
        })
        .map((customer) => {
          return (
            <div>
              <Link to={"/admin/customers/" + customer._id}>
                <h4 id="h4">{customer.name}</h4>
              </Link>

              <AdminBookingDetail
                bookings={bookings.filter(
                  (booking) => booking.clientId!.toString() === customer._id
                )}
              />
            </div>
          );
        })}
    </>
  );
};
