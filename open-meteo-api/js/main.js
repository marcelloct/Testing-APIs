fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log(data.current.time);
    console.log(data.current.temperature_2m);
    console.log(data.current_units.temperature_2m);

    // Manipulating the values

    const currentTime = new Date(data.current.time);
    const joinDate = `${currentTime.getFullYear()}-${
      currentTime.getMonth() + 1
    }-${currentTime.getDay()}`;
    console.log(joinDate);

    const joinTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    console.log(joinTime);

    const temperature = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    console.log(temperature);

    const humidityNow = data.hourly.relative_humidity_2m[0];
    console.log(humidityNow);

    const hourlyTemperature = data.hourly.temperature_2m;
    let lastFiveTemperatures = hourlyTemperature.slice(-5);
    console.log(hourlyTemperature);

    // Get the first five
    // for (let i = 0; i < hourlyTemperature.length; i++) {
    //   if (i < 5) {
    //     lastFiveTemperatures.push(hourlyTemperature[i]);
    //   }
    // }

    console.log(lastFiveTemperatures);

    // Displaying the values
    document.querySelector("h3").innerText = joinDate;
    document.querySelector("h4").innerText = joinTime;
    document.querySelector("span").innerText = temperature;
    document.querySelector("p").innerText =
      humidityNow >= 60
        ? "It's raining"
        : humidityNow >= 30
        ? "Possibility of Raining"
        : humidityNow <= 10
        ? "Sunny Day"
        : "";

    for (let e of lastFiveTemperatures) {
      const createList = document.createElement("li");
      const apendTemp = document.querySelector("ul").appendChild(createList);
      apendTemp.innerText = e;
    }
  })
  .catch((err) => {
    throw err;
  });
