import { fetchBookings } from "./handleBookingsFetch.service";

export interface Sittings {
  firstSitting: boolean;
  secondSitting: boolean;
}

export const checkAvailableSittings = async (
  isTheSame: boolean,
  date: Date,
  nop: number
) => {
  let isAvailable: Sittings = {
    firstSitting: true,
    secondSitting: true,
  };

  let response = await fetchBookings();
  let tables: number = 0;
  if (isTheSame && nop > 6) {
    tables = tables - 1;
  }
  for (let i = 0; i < response.data.length; i++) {
    // får listan med totala bokingar
    let dbDate = new Date(response.data[i].date);
    let inComingDate = new Date(date);

    if (dbDate.getTime() === inComingDate.getTime()) {
      // kollat vilka som matchar önskat datum

      // Kontroller Sittning 1:
      if (response.data[i].sittingTime === 1) {
        tables = tables + 1;
        if (response.data[i].numberOfPeople > 6) {
          tables = tables + 1;
        }

        //om användaren bokar för fler än 6 personer
        if (nop > 6) {
          if (tables >= 14) {
            isAvailable.firstSitting = false;
          } else {
            isAvailable.firstSitting = true;
          }
          //om användaren bokar för mindre än 6 personer
        } else {
          if (tables >= 15) {
            isAvailable.firstSitting = false;
          } else {
            isAvailable.firstSitting = true;
          }
        }
      }
      // Sittning 2
      if (response.data[i].sittingTime === 2) {
        tables = tables + 1;
        if (response.data[i].numberOfPeople > 6) {
          tables = tables + 1;
        }

        //om användaren bokar för fler än 6 personer
        if (nop > 6) {
          if (tables >= 14) {
            isAvailable.firstSitting = false;
          } else {
            isAvailable.firstSitting = true;
          }
          //om användaren bokar för mindre än 6 personer
        } else {
          if (tables >= 15) {
            isAvailable.firstSitting = false;
          } else {
            isAvailable.firstSitting = true;
          }
        }
      }
    }
  }

  return isAvailable;
};
