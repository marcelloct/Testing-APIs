//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector("button").addEventListener("click", function () {
  const dateChoice = document.querySelector("input").value;
  console.log(dateChoice);

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=zU71SV2z8UAS2tpSRxtx9Ii4giGUAk6QIufK4bCn&date=${dateChoice}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("h2").innerText = data.title;

      if (data.media_type === "image") {
        document.querySelector("iframe").style.display = "none";
        document.querySelector("img").style.display = "block";
        document.querySelector("img").src = data.hdurl;
      } else if (data.media_type === "video") {
        document.querySelector("img").style.display = "none";
        document.querySelector("iframe").style.display = "block";
        document.querySelector("iframe").src = data.url;
      }

      document.querySelector("h3").innerText = data.explanation;
      document.querySelector("span").innerText = data.date;
      console.log(data);
    })
    .catch((err) => {
      `error: ${err}`;
    });
});
