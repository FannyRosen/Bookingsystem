export interface CustomerData {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
export interface NewCustomerData {
  name: string;
  email: string;
  phone: string;
}

export interface CustomersResponse {
  data: CustomerData[];
}

export interface CustomerResponse {
  data: CustomerData;
}

export const customersDefaultValue: CustomerData = {
  _id: "",
  name: "",
  email: "",
  phone: "",
};

export interface FormCustomer {
  name: string;
  email: string;
  phone: string;
}

export const formCustomersDefaultValue: FormCustomer = {
  name: "",
  email: "",
  phone: "",
};
