let calendar = document.querySelector('.calendar');

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

const time = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:00",
        "end_time": "10:30"
    }
];

const calendarTime = document.querySelector('.calendar-time');
const boxes = calendarTime.querySelector('.boxes');

time.forEach(item => {
    const timeBox = document.createElement('div');
    timeBox.classList.add('calendar-box');
    timeBox.innerHTML = `
        <p class="start-time">${item.start_time}</p>
        <p class="end-time">${item.end_time}</p>
    `;
    boxes.appendChild(timeBox);
});

const calendarBoxes = document.querySelectorAll('.calendar-box');

calendarBoxes.forEach(box => {
    box.addEventListener('click', () => {
        calendarBoxes.forEach(otherBox => {
            otherBox.classList.remove('selectedBox');
            otherBox.querySelector('.start-time').style.color = ''; 
            otherBox.querySelector('.end-time').style.color = ''; 
        });

        box.classList.add('selectedBox');
        box.querySelector('.start-time').style.color = 'white'; 
        box.querySelector('.end-time').style.color = 'white'; 
    });
});

const date = ["2023-08-04", "2023-08-05", "2023-08-06"];

const calendarDaysContainer = document.querySelector('.calendar-days'); 

const matchedDays = [];

date.forEach(dateString => {
    const [year, month, day] = dateString.split("-");

    calendarDaysContainer.querySelectorAll('.calendar-day-hover').forEach(calendarDay => {
        if (parseInt(day) === parseInt(calendarDay.textContent)) {
            matchedDays.push(`${year}-${month}-${day}`);
            calendarDay.classList.add('matched-day'); 
        }
    });
});

console.log('Matched days:', matchedDays);

calendarDaysContainer.addEventListener('click', event => {
    const clickedDay = event.target;

    if (clickedDay.classList.contains('matched-day')) {
        calendarDaysContainer.querySelectorAll('.matched-day').forEach(calendarDay => {
            calendarDay.style.backgroundColor = '';
        });

        clickedDay.style.backgroundColor = '#6C70DC';

        const calendarBodyText = document.querySelector('.calendar-body-text p');
        if (calendarBodyText) {
            const years = date.map(dateString => dateString.split("-")[0]);
            const months = date.map(dateString => dateString.split("-")[1]);

            const clickedDate = clickedDay.textContent;
            calendarBodyText.textContent = `${years[0]}-${months[0]}-${0 + clickedDate}`;

            localStorage.setItem('selectedDate', `${years[0]}-${months[0]}-${0 + clickedDate}`);
        }
    }
});

const selectError = document.querySelector('.select-error');
const nextButton = document.querySelector('.select-next a');

nextButton.addEventListener('click', (event) => {
    event.preventDefault(); 

    const selectedDate = document.querySelector('.calendar-day-hover.selected');
    const selectedTime = document.querySelector('.calendar-box.selectedBox');

    if (!selectedDate && !selectedTime) {
        selectError.style.display = 'block'; 
    } else {
        const storedDate = localStorage.getItem('selectedDate');

        const nextPage = nextButton.getAttribute('data-next-page');
        if (nextPage) {
            window.location.href = nextPage;
        }
    }
});
