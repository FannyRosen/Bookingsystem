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
  const [sitting, setSitting] = useState(0);

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
        </>
      )}
      {phase === 3 && (
        <>
          <h2>Your information</h2>
          <form onSubmit={handleSubmit(onSecondSubmit)} className="infoForm">
            <label>Name:</label>
            <input
              className="name"
              {...register("name", {
                required: true,
                minLength: 1,
                maxLength: 40,
              })}
              type="text"
            />{" "}
            {errors.name && <label>Submit your name &#11105;</label>}
            <label>Email:</label>
            <input
              className="email"
              {...register("email", {
                required: true,
              })}
              type="email"
            />
            {errors.email && <span>Submit your email &#11105;</span>}
            <label>Phone number:</label>
            <input
              type="text"
              className="phone"
              {...register("phone", {
                required: true,
                minLength: 9,
                maxLength: 12,
              })}
            />
            {errors.phone && <span>Submit your phone number &#11105;</span>}
          </form>
        </>
      )}
    </>
  );
}
