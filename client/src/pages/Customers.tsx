import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerData } from "../models/CustomerData";
import { fetchCustomers } from "../services/handleCustomersFetch.service";

export const Customers = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  useEffect(() => {
    fetchCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Link to={"/admin"}>
        <button>See all bookings</button>
      </Link>
      {customers.map((customers) => {
        return (
          <div key={customers._id}>
            <p>{customers.name}</p>
            <p>{customers.email}</p>
            <p>{customers.phone}</p>
            <Link to={"/admin/customers/" + customers._id}>
              <button>GO TO CUSTOMER</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
