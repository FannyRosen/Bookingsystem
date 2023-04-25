import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { bookingsDefaultValue, BookingData } from "../../models/BookingData";
import {
  editBooking,
  fetchBookingByID,
} from "../../services/handleBookingsFetch.service";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Calendar from "react-calendar";
import { checkAvailableSittings, Sittings } from "../../services/utils";

interface Props {
  onClick(): void;
}

export const UpdateBooking = (props: Props) => {
  const [existingBooking, setExistingBooking] =
    useState<BookingData>(bookingsDefaultValue);
  const [isAvailable, setIsAvailable] = useState<Sittings>({
    firstSitting: true,
    secondSitting: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  //Hämtar bokning
  useEffect(() => {
    const getBooking = async () => {
      await fetchBookingByID(params.id!).then((booking) => {
        setExistingBooking(booking.data);
      });
    };
    getBooking();
  }, []);

  // sätter defaultvärde i formuläret enligt existerande bokning
  useEffect(() => {
    if (
      existingBooking.numberOfPeople !== 0 &&
      existingBooking.sittingTime !== 0
    ) {
      reset({
        date: new Date(existingBooking.date),
        sittingTime: existingBooking.sittingTime,
        numberOfPeple: existingBooking.numberOfPeople,
      });
      setIsLoading(false);
    }
  }, [existingBooking]);

  // Sparar ny bokning med eventuella ändringar
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    let isTheSame: boolean = false;
    const checkAvailable = async () => {
      if (
        new Date(existingBooking.date).getTime() ==
        new Date(data.date).getTime()
      ) {
        isTheSame = true;
      }

      const isAvailableinDB = await checkAvailableSittings(
        isTheSame,
        data.date as Date,
        data.numberOfPeople as number
      );

      if (
        (data.sittingTime === 1 && isAvailableinDB.firstSitting === true) ||
        (data.sittingTime === 2 && isAvailableinDB.secondSitting === true)
      ) {
        let newBooking: BookingData = {
          date: data.date,
          sittingTime: data.sittingTime,
          numberOfPeople: data.numberOfPeople,
        };
        editBooking(params.id!, newBooking)
          .then(() => {
            props.onClick();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setIsAvailable(isAvailableinDB);
        setIsLoading(false);
      }
    };
    checkAvailable();
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} className="bookingform">
          <div>
            <label>Choose a date</label>
            <div>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange } }) => (
                  <Calendar
                    onChange={onChange}
                    maxDate={new Date("2023-12-31")}
                    defaultValue={new Date(existingBooking.date)}
                  />
                )}
              />
            </div>

            {errors.date && <p>Pick a date &#11105;</p>}

            <label>Number of people</label>
            <select
              className="nop"
              {...register("numberOfPeople", {
                min: 1,
                max: 12,
              })}
              defaultValue={existingBooking.numberOfPeople}
            >
              <option disabled value={0}>
                0
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
            {errors.numberOfPeople && <p>Pick number of people &#11105;</p>}
            <label>Sitting time:</label>
            <select
              className="updateSitting"
              {...register("sittingTime")}
              defaultValue={existingBooking.sittingTime}
            >
              <option value={1}>6.00 pm</option>
              <option value={2}>9.00 pm</option>
            </select>
            {errors.sittingTime && <p>Choose a sitting time &#11105;</p>}

            <input
              type="submit"
              value={"Update booking"}
              className="updateBooking"
            />
            {isAvailable?.firstSitting ? (
              <></>
            ) : (
              <p>The time you have chosen is not available</p>
            )}
            {isAvailable?.secondSitting ? (
              <></>
            ) : (
              <p>The time you have chosen is not available</p>
            )}
          </div>
        </Form>
      )}
    </>
  );
};
