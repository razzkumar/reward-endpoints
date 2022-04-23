function getFirstAndLastDayOfWeek(date) {
  // check if date or not
  if (date instanceof Date === false) {
    throw new Error("date is not a Date object");
  }

  const fistDayofWeek = date.getDate() - date.getDay();
  const lastDayWeek = fistDayofWeek + 6;

  // from 12 AM
  const sunday = new Date(date.setDate(fistDayofWeek)).setHours(0, 0, 0, 0);

  // till 12 PM
  const saturday = new Date(date.setDate(lastDayWeek)).setHours(
    23,
    59,
    59,
    999
  );

  return [sunday, saturday];
}

module.exports = { getFirstAndLastDayOfWeek };
