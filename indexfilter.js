// Oprettelse af variabler
let topDestinationer;
const container = document.querySelector(".data_container");
const temp = document.querySelector("template");

// Opret forbindelse til restdb herunder link og nøgle
const url = "https://destinationer-f732.restdb.io/rest/destinationer";
const options = {
  headers: { "x-apikey": "613b165043cedb6d1f97ef44" },
};

document.addEventListener("DOMContentLoaded", start);
let filter = "ja";
let dest;

function start() {
  hentdata();
}

// Her hentes data ind fra restdb via fetch
async function hentdata() {
  const response = await fetch(url, options);
  topDestinationer = await response.json();
  visListe();
}

// Når menuen vises, bestemmers der her hvad der skal vises om hver destination og hvor informationerne om disse skal placeres henne
function visListe() {
  console.log(topDestinationer);
  topDestinationer.forEach((dest) => {
    if (filter == dest.topdestination) {
      let klon = temp.cloneNode(true).content;
      klon.querySelector("h2").textContent = dest.by;
      klon.querySelector("img").src = "img/" + dest.billede + ".svg";
      klon.querySelector(".land").textContent = dest.land;
      klon.querySelector("article").addEventListener("click", () => {
        location.href = "singleview.html?id=" + dest._id;
      });
      container.appendChild(klon);
    }
  });
}
