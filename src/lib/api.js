const timeUrl = "http://worldtimeapi.org/api/ip";
const geoUrl = "https://freegeoip.app/json/";
const randomQuoteUrl = "https://api.quotable.io/random";

/**
 * ### World Time API
 * * Updates elements after getting the data
 * @param {object} data 
 */
function updateTimeInfo(data = {}) {
  const day = document.getElementById("day");
  const dayOfWeek = document.getElementById("day-of-week");
  const week = document.getElementById("week");
  const clock = document.querySelector(".clock h1");

  let { day_of_year, day_of_week, week_number } = data;

  var today = new Date(data["utc_datetime"]);
  var time = today.toLocaleTimeString("tr-TR", { hour: "numeric", minute: "numeric" });
  
  selectMessage(today.getHours());
  changeImg(today.getHours());
  clock.textContent = time;
  day.textContent = day_of_year || "";
  dayOfWeek.textContent = day_of_week || "";
  week.textContent = week_number || "";
}


/**
 * ### Geo API
 * * Updates elements after getting the data
 * @param {object} data 
 */
function updateGeoInfo(data = {}) {
  const zone = document.getElementById("timezone");
  const location = document.querySelector(".location");
  const { time_zone } = data;

  location.textContent = `In ${data["region_name"]}, ${data["country_code"]}`;
  zone.textContent = time_zone || "";
}

function selectMessage(time) {
  const message = document.querySelector(".message");

  if (time < 12 && time >= 5) {
    message.textContent = "Good Morning";
  } else if (time >= 18 || time < 5) {
    message.textContent = "Good Evening";
  } else if (time >= 12 && time < 18) {
    message.textContent = "Good Afternoon";
  }
}

function changeImg(time) {
  const nightImgDesktop = "url('./../assets/desktop/bg-image-nighttime.jpg')";
  const dayImgDesktop = "url('./../assets/desktop/bg-image-daytime.jpg')";
  const moonIcon = './assets/desktop/icon-moon.svg';
  const sunIcon = './assets/desktop/icon-sun.svg';
  const sun_icon = document.querySelector(".sun-icon");

  if (time >= 18) {
    document.body.style.backgroundImage = nightImgDesktop;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    sun_icon.innerHTML = `<img src=${moonIcon} alt="icon">`;
  } else if (time <= 12) {
    sun_icon.innerHTML = `<img src=${sunIcon} alt="icon">`;

    document.body.style.backgroundImage = dayImgDesktop;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
}

async function getGeo() {
  await fetch(geoUrl).then((res) => res.json())
    .then((data) => {
      updateGeoInfo(data);
    })
    .catch(err => {
      console.error(err);
      alert("Close adblock!");
    });
}

async function getTime() {
  await fetch(timeUrl).then(res => {
    return res.json();
  })
    .then(data => {
      updateTimeInfo(data);
    })
    .catch(err => {
      console.error(err);
      alert("Close adblock!");
    });
}


async function getRandomQuote() {
  const quoteContent = document.querySelector(".quote__content");
  const quoteAuthor = document.querySelector(".author");
  
  await fetch(randomQuoteUrl).then(res => res.json())
    .then(data => {
      const { author, content } = data;
      quoteContent.textContent = "“" + content + "”"; 
      quoteAuthor.textContent = author;
    })
    .catch(e => console.error(e));
}

export { getGeo, getTime, getRandomQuote };