//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector("button").addEventListener("click", function () {
  const dateChoice = document.querySelector("input").value;
  console.log(dateChoice);

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateChoice}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("h2").innerText = data.title;
      document.querySelector("img").src = data.hdurl;
      document.querySelector("h3").innerText = data.explanation;
      document.querySelector("span").innerText = data.date;

      console.log(data);
    })
    .catch((err) => {
      `error: ${err}`;
    });
});
