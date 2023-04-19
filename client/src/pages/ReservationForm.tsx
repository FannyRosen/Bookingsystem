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
  const [sittingTime, setSittingTime] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onFirstSubmit = (data: any) => {
    setPhase(2);
  };

  const onSecondSubmit = async () => {
    let booking = {
      date: new Date(date),
      sittingTime,
      email,
      numberOfPeople,
      name,
      phone,
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
          <form onSubmit={handleSubmit(() => undefined)}>
            <h2>Available sittings:</h2>
            <button
              type="button"
              onClick={() => {
                setSittingTime(1);
                setPhase(3);
              }}
            >
              18:00
            </button>
            <button
              type="button"
              onClick={() => {
                setSittingTime(2);
                setPhase(3);
              }}
            >
              21:00
            </button>
          </form>
        </>
      )}
      {phase === 3 && (
        <form onSubmit={handleSubmit(onSecondSubmit)}>
          <h2>Your information</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone number:
            <input
              type="tel"
              name="phoneNumber"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" value={"book"}>
            Submit reservation
          </button>
        </form>
      )}
    </>
  );
}
