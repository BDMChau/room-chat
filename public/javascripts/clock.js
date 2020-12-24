document.addEventListener(
	"DOMContentLoaded",
	function () {
		const hour = document.querySelector('.hour');
		const minute = document.querySelector('.minute');
		const second = document.querySelector('.second');

		const day = document.querySelector('.day1');
		const date = document.querySelector('.day2');
		const month = document.querySelector('.month');
		const year = document.querySelector('.year');


		clockTime = () => {
			const today = new Date();

			const h = today.getHours();
			const m = today.getMinutes();
			const s = today.getSeconds()
			hour.innerHTML = h + ' :';
			minute.innerHTML = m + ' :';
			second.innerHTML = s;

			const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", " Nov", "Dec"];

			let currentDay = days[today.getDay()], //Sunday - Saturday : 0 - 6
				currentDate = today.getDate(), // the day of the month
				currentMonth = months[today.getMonth()],
				currentYear = today.getFullYear();

			date.innerHTML = currentDate;
			month.innerHTML = currentMonth;
			year.innerHTML = currentYear;
		}

		setInterval(clockTime, 200);
	},
	false
);
