import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { postBooking } from "../services/handleBookingsFetch.service";
import Calendar from "react-calendar";

export interface ReservationFormData {
  numberOfPeople: number;
  date: string;
}

export default function ReservationForm() {
  /*   const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [date, setDate] = useState(""); */
  const [phase, setPhase] = useState(1);
  const [sittingTime, setSittingTime] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [date, numberOfPeople] = watch(["date", "numberOfPeople"]);

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
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Calendar
                    onChange={onChange}
                    minDate={new Date()}
                    maxDate={new Date("2023-12-31")}
                  />
                )}
              />
            </label>
            <label>
              Number of people
              <select
                {...register("numberOfPeople", {
                  required: true,
                  min: 1,
                  max: 6,
                })}
                defaultValue="0"
              >
                <option disabled value="0">
                  0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
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
