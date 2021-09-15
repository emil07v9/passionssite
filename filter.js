// Oprettelse af variabler
let listeDestinationer;
let filter = "alle";
const container = document.querySelector(".data_container");
const temp = document.querySelector("template").content;
const kategoriNavn = document.querySelector("h2");

// Opret forbindelse til restdb herunder link og nøgle
const url = "https://destinationer-f732.restdb.io/rest/destinationer";
const options = {
  headers: { "x-apikey": "613b165043cedb6d1f97ef44" },
};

// Her hentes data ind fra restdb via fetch
async function hentdata() {
  const response = await fetch(url, options);
  listeDestinationer = await response.json();
  visListe();
}

// Når menuen vises, bestemmers der her hvad der skal vises om hver ret og hvor informationerne om disse skal placeres henne
function visListe() {
  container.textContent = "";
  listeDestinationer.forEach((dest) => {
    if (filter === dest.land || filter == dest.ferietype || filter == "alle") {
      let klon = temp.cloneNode(true);
      klon.querySelector("h3").textContent = dest.by;
      klon.querySelector("img").src = "img/" + dest.billede + ".svg";
      klon.querySelector(".kortbeskrivelse").textContent = dest.kortbeskrivelse;
      klon.querySelector(".land").textContent = dest.land;
      klon.querySelector("article").addEventListener("click", () => {
        location.href = "singleview.html?id=" + dest._id;
      });
      container.appendChild(klon);
      console.log(filter);
    }
  });
}

// Oprettelse af start function. denne starter når DOM'en er loaded
document.addEventListener("DOMContentLoaded", start);

// Definition af start function - Her gøres knapperne klikbare + der oprettes filter på dem
function start() {
  const filterKnapper = document.querySelectorAll(".knapper nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerDestinationer)
  );
  hentdata();
}
// Her defineres hvad der vises når en knap er trykket på og hvad der filtreres
function filtrerDestinationer() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visListe();

  // Definering af tekst på h2
  kategoriNavn.textContent = this.textContent;
}
