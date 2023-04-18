import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { postBooking } from "../services/handleBookingsFetch.service";

export interface ReservationFormData {
  numberOfPeople: number;
  date: string;
}

export default function ReservationForm() {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [date, setDate] = useState("");
  const [phase, setPhase] = useState(1);
  const [sitting, setSitting] = useState(0);

  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onFirstSubmit = (data: any) => {
    setPhase(2);
  };

  const onSecondSubmit = async (data: any) => {
    let booking = {
      date: new Date(date),
      sittingTime: sitting,
      email: data.email,
      numberOfPeople: numberOfPeople,
      name: data.name,
      phone: data.phone,
      id: "",
    };

    postBooking(booking)
      .then((resData) => {
        booking.id = resData.data._id!;

        /*   navigate("/thankyou", { state: booking }); */
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {phase === 1 && (
        <>
          <h2>Book a table</h2>
          <form onSubmit={handleSubmit(onFirstSubmit)}>
            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              Number of people
              <input
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              />
            </label>
            <button type="submit">Check availability</button>
          </form>
        </>
      )}
      {phase === 2 && (
        <>
          <form onSubmit={handleSubmit(onSecondSubmit)}>
            <h2>Available sittings:</h2>
            <button
              type="button"
              onClick={() => {
                setSitting(1);
                setPhase(3);
              }}
            >
              18:00
            </button>
            <button
              type="button"
              onClick={() => {
                setSitting(2);
                setPhase(3);
              }}
            >
              21:00
            </button>
          </form>
        </>
      )}
      {phase === 3 && (
        <>
          <h2>Your information</h2>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <br />
          <label>
            Phone number:
            <input type="number" name="phoneNumber" required />
          </label>
          <br />
          <button type="submit" value={"book"}>
            Submit reservation
          </button>
        </>
      )}
    </>
  );
}
