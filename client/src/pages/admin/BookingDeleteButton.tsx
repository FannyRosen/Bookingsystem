import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingData } from "../../models/BookingData";
import { deleteBooking } from "../../services/handleBookingsFetch.service";

interface DeleteButtons {
  booking: BookingData;
  guestPath: boolean;
  adminPath: boolean;
}

export const BookingDeleteButton = (props: DeleteButtons) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete ? (
        <>
          <button
            className="confirmbutton"
            onClick={() => deleteBooking(props.booking._id!)}
          >
            {props.guestPath ? <Link to={"/"}>Confirm</Link> : <></>}
            {props.adminPath ? <Link to={"/admin"}>Confirm</Link> : <></>}
          </button>
        </>
      ) : (
        <>
          <button
            className="deletebutton"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
};
