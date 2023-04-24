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
  /*  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [date, setDate] = useState(""); */
  const [phase, setPhase] = useState(1);
  const [sittingTime, setSittingTime] = useState(0);
  /*   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); */

  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors },
  } = useForm();

  const [date, numberOfPeople] = watch(["date", "numberOfPeople"]);

  const onFirstSubmit = (data: any) => {
    setPhase(2);
  };

  const onSecondSubmit = async (data: any) => {
    let booking = {
      date: new Date(date),
      sittingTime: sittingTime,
      email: data.email,
      numberOfPeople: numberOfPeople,
      name: data.name,
      phone: data.phone,
      id: "",
    };

    postBooking(booking)
      .then((resData) => {
        booking.id = resData.data._id!;

        navigate("/thankyou", { state: booking });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {phase === 1 && (
        <div className="reservation-wrapper">
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
                    className="calendar"
                  />
                )}
              />
            </label>
            <label>
              Number of people
              <select
                className="nop"
                {...register("numberOfPeople", {
                  required: true,
                  min: 1,
                  max: 12,
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
              {errors.numberOfPeople && <p>Pick number of people &#11105;</p>}
            </label>
            <button type="submit">Check availability</button>
          </form>
        </div>
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
          <label> Name:</label>
          <input
            className="name"
            {...register("name", {
              required: true,
              minLength: 1,
              maxLength: 40,
            })}
            type="text"
          />{" "}
          {errors.name && <p>Submit your name &#11105;</p>}
          <br />
          <label> Email: </label>
          <input
            className="email"
            {...register("email", {
              required: true,
            })}
            type="email"
          />
          {errors.email && <p>Submit your email &#11105;</p>}
          <br />
          <label> Phone number: </label>
          <input
            type="number"
            className="phone"
            {...register("phone", {
              required: true,
              minLength: 9,
              maxLength: 12,
            })}
          />
          {errors.phone && <p>Submit your phone number &#11105;</p>}
          <br />
          <button type="submit" value={"book"}>
            Submit reservation
          </button>
        </form>
      )}
    </>
  );
}
