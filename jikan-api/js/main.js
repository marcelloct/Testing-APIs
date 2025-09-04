const container = document.querySelector(".container");
let arrOfAnimes = [];

document.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault();
  const selectYear = document.querySelector("#yearChoice").value;
  const selectSeason = document.querySelector("#season").value;
  console.log(selectYear, selectSeason);

  fetch(`https://api.jikan.moe/v4/seasons/${selectYear}/${selectSeason}?sfw`)
    .then((res) => res.json())
    .then((data) => {
      arrOfAnimes = data.data;
      console.log(arrOfAnimes);
      if (arrOfAnimes && arrOfAnimes.length > 0) {
        displayAnime(arrOfAnimes);
      } else {
        container.innerHTML = "No Results";
      }
    })
    .catch((err) => {
      `error: ${err}`;
    });
});

function displayAnime(arr) {
  console.log(arr);

  container.innerHTML = "";

  for (let anime of arr) {
    const containerItem = document.createElement("div");
    container.appendChild(containerItem);

    const thumb = document.createElement("img");
    thumb.src = anime.images.jpg.image_url;
    containerItem.appendChild(thumb);

    const title = document.createElement("h2");
    title.innerText = anime.title;
    containerItem.appendChild(title);

    const studios = document.createElement("p");
    for (let i = 0; i < anime.studios.length; i++) {
      studios.innerText += anime.studios[i].name;
    }

    containerItem.appendChild(studios);
  }
}
