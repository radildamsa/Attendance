document.addEventListener("DOMContentLoaded", function() {
    displayDateTime();
    populateMonthYearDropdown();
});

function displayDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    setInterval(() => {
        const now = new Date();
        dateTimeElement.innerHTML = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
    }, 1000);
}

let restStartTime, restEndTime;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString();
}

function roundTime() {
  const now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();

  // Round minutes to the nearest quarter hour
  if (minutes < 8) {
    minutes = 0;
  } else if (minutes < 23) {
    minutes = 15;
  } else if (minutes < 38) {
    minutes = 30;
  } else if (minutes < 53) {
    minutes = 45;
  } else {
    minutes = 0;
    hours += 1;
  }

  // Handle the case where hours wrap around past 23
  if (hours === 24) {
    hours = 0;
  }

  // Format the time as HH:MM
  const roundedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return roundedTime;
}

function checkIn() {
  document.getElementById('check-in-time').value = getCurrentTime();
  document.getElementById('check-in-time-rounded').value = roundTime();
}

function restStart() {
  restStartTime = new Date();
  document.getElementById('rest-start-time').value = getCurrentTime();
}

function restEnd() {
  restEndTime = new Date();
  document.getElementById('rest-end-time').value = getCurrentTime();
  document.getElementById('rest-hours').value = getRestHours();
}

function checkOut() {
  document.getElementById('check-out-time').value = getCurrentTime();
  document.getElementById('check-out-time-rounded').value = roundTime();
}

function getRestHours() {
  if (restStartTime && restEndTime) {
    const restDuration = (restEndTime - restStartTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return restDuration.toFixed(2) + " hours";
  }
  return "0 hours";
}

function populateYearDropdown() {
  const selectYear = document.getElementById('select-year');
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 5; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      selectYear.appendChild(option);
  }
}

function populateMonthDropdown() {
  const selectMonth = document.getElementById('select-month');
  for (let month = 1; month <= 12; month++) {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = String(month).padStart(2, '0');
      selectMonth.appendChild(option);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateYearDropdown();
  populateMonthDropdown();
});

