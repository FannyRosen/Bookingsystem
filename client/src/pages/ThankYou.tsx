import { useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  date: Date;
  sittingTime: number;
  numberOfPeople: number;
  name: string;
  email: string;
  phone: string;
  id: string;
}

export const ThankYou = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-2);
    }, 10000);
  }, [navigate]);

  return (
    <div className="thankyou">
      <h2>Thank you {state.name}!</h2>
      <span> Your booking is completed!</span>
      <span> A confirmation email has been sent to: {state.email}</span>
      <span>Date:{state.date.toLocaleDateString()}</span>
      <span>Number of people:{state.numberOfPeople}</span>
      <span> Booking number: {state.id}</span>
    </div>
  );
};
