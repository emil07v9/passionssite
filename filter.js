// Oprettelse af variabler
let listeDestinationer;
let filter = "alle";
container = document.querySelector("section");
temp = document.querySelector("template").content;
const kategoriNavn = document.querySelector("h2");

// Opret forbindelse til restdb herunder link og nøgle
const url = "https://destinationer-f732.restdb.io/rest/destinationer";
const options = {
  headers: { "x-apikey": "de793eaae0f0839a15545ba235ff12f3cc543" },
};

// Her hentes data ind fra restdb via fetch
async function hentdata() {
  const response = await fetch(url, options);
  listeDestinationer = await response.json();
  visListe();
  console.log(listeDestinationer);
}

// Oprettelse af start function. denne starter når DOM'en er loaded
document.addEventListener("DOMContentLoaded", start);

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerDestinationer)
  );
  hentdata();
}
