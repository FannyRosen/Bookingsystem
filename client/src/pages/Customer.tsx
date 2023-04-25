import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteCustomer,
  fetchCustomerByID,
} from "../services/handleCustomersFetch.service";
import { customersDefaultValue, CustomerData } from "../models/CustomerData";

export const Customer = () => {
  const [customerById, setCustomerById] = useState<CustomerData>(
    customersDefaultValue
  );

  let params = useParams();

  useEffect(() => {
    fetchCustomerByID(params.id!).then((response) => {
      setCustomerById(response.data);
    });
  }, [params]);

  return (
    <div>
      <button>
        <Link to={"/admin"}>GO BACK</Link>
      </button>
      <p>{customerById.name}</p>
      <p>{customerById.email}</p>
      <p>{customerById.phone}</p>
      <button
        onClick={() => {
          deleteCustomer(customerById._id);
        }}
      >
        <Link to={"/admin"}>DELETE</Link>
      </button>
    </div>
  );
};
