import axios from "axios";

export async function post<T, S>(url: string, data: S) {
  return await axios.post<T>(url, data);
}
