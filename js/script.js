// Input Elements
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

// Submit Button
const submitButton = document.getElementById("submitBtn");

// Output Elements
const dayOutput = document.getElementById("dayOutp");
const monthOutput = document.getElementById("monthOutp");
const yearOutput = document.getElementById("yearOutp");

// Error Elements
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

// Error Functions
const emptyError = (input, errorElement) => {
  if (input.value === "") {
    errorElement.style.display = "block";
    errorElement.innerHTML = "This field is required";
    return true;
  } else {
    errorElement.style.display = "none";
    return false;
  }
};

// Check if the date is valid
const isValidDate = (day, month, year) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// Invalid Day / Month / Year Functions
const invalidDay = (dayInput, errorElement) => {
  const day = parseInt(dayInput.value, 10);
  if (day < 1 || day > 31 || isNaN(day)) {
    errorElement.style.display = "block";
    errorElement.innerHTML = "Must be a valid day";
    return true;
  } else {
    errorElement.style.display = "none";
    return false;
  }
};

const invalidMonth = (monthInput, errorElement) => {
  const month = parseInt(monthInput.value, 10);
  if (month < 1 || month > 12 || isNaN(month)) {
    errorElement.style.display = "block";
    errorElement.innerHTML = "Must be a valid month";
    return true;
  } else {
    errorElement.style.display = "none";
    return false;
  }
};

const invalidYear = (yearInput, errorElement) => {
  const year = parseInt(yearInput.value, 10);
  const currentYear = new Date().getFullYear();

  if (year < 1000 || isNaN(year)) {
    errorElement.style.display = "block";
    errorElement.innerHTML = "Must be a valid year";
    return true;
  } else if (year > currentYear) {
    errorElement.style.display = "block";
    errorElement.innerHTML = "Year must be in the past";
    return true;
  } else {
    errorElement.style.display = "none";
    return false;
  }
};

// Calculate Age Function
const calculateAge = (date) => {
  const today = new Date(); // Current date

  let ageYear = today.getFullYear() - date.getFullYear();
  let ageMonth = today.getMonth() - date.getMonth();
  let ageDay = today.getDate() - date.getDate();

  // If the current month/day is less than the birth month/day, adjust the values
  if (ageDay < 0) {
    ageMonth--;
    ageDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Add days of the previous month
  }
  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12; // Add months to get the correct month difference
  }

  // Output the age
  yearOutput.innerHTML = ageYear;
  monthOutput.innerHTML = ageMonth;
  dayOutput.innerHTML = ageDay;
};

// Reset Output to '--' Function
const resetOutput = () => {
  dayOutput.innerHTML = "--";
  monthOutput.innerHTML = "--";
  yearOutput.innerHTML = "--";
};

// Event listener for submit button to calculate age
submitButton.addEventListener("click", () => {
  // Parse the input values inside the event listener
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  // Reset the output before validation
  resetOutput();

  // Check for empty inputs or invalid date first
  const dayHasError = emptyError(dayInput, dayError);
  const monthHasError = emptyError(monthInput, monthError);
  const yearHasError = emptyError(yearInput, yearError);

  const dayInvalid = invalidDay(dayInput, dayError);
  const monthInvalid = invalidMonth(monthInput, monthError);
  const yearInvalid = invalidYear(yearInput, yearError);

  // If there's any error, stop here
  if (
    dayHasError ||
    monthHasError ||
    yearHasError ||
    dayInvalid ||
    monthInvalid ||
    yearInvalid
  ) {
    resetOutput(); // Ensure outputs are '--' when there's an error
    return;
  }

  // If the date is valid, calculate the age
  if (isValidDate(day, month, year)) {
    const date = new Date(year, month - 1, day); // Create Date object from inputs
    calculateAge(date);
  } else {
    resetOutput(); // If date is invalid, keep outputs as '--'
  }
});
