import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import ReservationForm from "./pages/ReservationForm";
import { ThankYou } from "./pages/ThankYou";
import { AdminBookings } from "./pages/AdminBookings";
import { SingleBooking } from "./pages/SingleBooking";
import { Customer } from "./pages/Customer";
import { Customers } from "./pages/Customers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/book" element={<ReservationForm />}></Route>
          <Route path="/thankyou" element={<ThankYou />}></Route>

          <Route path="/admin">
            <Route index element={<AdminBookings />}></Route>
            <Route path=":id" element={<SingleBooking />}></Route>
          </Route>

          <Route path="/admin/customers">
            <Route index element={<Customers />}></Route>
            <Route path=":id" element={<Customer />}></Route>
          </Route>

          <Route path="/reservation/:id" element={<SingleBooking />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
