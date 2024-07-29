let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function generateCalendar(month, year) {
    const daysContainer = document.getElementById('days');
    const currentMonthElement = document.getElementById('current-month');

    daysContainer.innerHTML = '';
    currentMonthElement.innerHTML = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        daysContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.innerHTML = i;
        dayCell.onclick = function() {
            const selectedDate = new Date(year, month, i).toLocaleDateString();
            window.parent.postMessage(selectedDate, window.location.origin);
        };
        daysContainer.appendChild(dayCell);
        
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

window.onload = () => {
    generateCalendar(currentMonth, currentYear);
};
