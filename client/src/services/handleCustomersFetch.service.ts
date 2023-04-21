import {
  CustomerResponse,
  CustomersResponse,
  NewCustomerData,
} from "../models/CustomerData";
import { get, post, put, axiosDelete } from "./handleAxiosRequests.service";

export async function fetchCustomers(): Promise<CustomersResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}`;
  return (await get<CustomersResponse>(response)).data;
}

export async function postCustomer(
  customer: NewCustomerData
): Promise<CustomerResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_POST}`;
  console.log(response);
  return (await post<CustomerResponse, NewCustomerData>(response, customer))
    .data;
}

export async function fetchCustomerByID(id: string): Promise<CustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_URI}/` + id;

  return (await get<CustomerResponse>(response)).data;
}
export async function deleteCustomer(id: string): Promise<CustomerResponse> {
  const response: string = `${process.env.REACT_APP_CUSTOMERS_DELETE}/` + id;
  return (await axiosDelete<CustomerResponse>(response)).data;
}

export async function editCustomer(
  id: string,
  customer: NewCustomerData
): Promise<CustomerResponse> {
  const response: string = `${process.env.REACT_APP_BOOKINGS_EDIT}/` + id;
  return (await put<CustomerResponse, NewCustomerData>(response, customer))
    .data;
}
