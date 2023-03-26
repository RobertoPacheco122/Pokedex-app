import getPokeData from "./utils/getPokeData.js";
import getPokePromise from "./utils/getPokePromise.js";
import { createCard } from "./render/index/renderCard.js";
import removeAllPokeCards from "./utils/removeAllPokeCards.js";

const form = document.querySelector(".main__form");
const searchInput = document.querySelector("#pokename");
const loadPokesButton = document.querySelector(".main__button--load");
const pokemonLoadNumber = 20;
let pokemonOffsetNumber = 0;

loadPokesButton.addEventListener("click", () => {
  pokemonOffsetNumber += pokemonLoadNumber;
  getPokeData(pokemonLoadNumber, pokemonOffsetNumber);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function handleChange(event) {
  event.preventDefault();
  const errorContainer = document.querySelector(".error--container");
  removeAllPokeCards(".main--container--poke");
  if (!loadPokesButton.classList.contains("hidden")) {
    loadPokesButton.classList.add("hidden");
  }

  if (searchInput.value === "") {
    pokemonOffsetNumber = 0;
    getPokeData(pokemonLoadNumber, pokemonOffsetNumber);
    errorContainer.innerHTML = "";
    loadPokesButton.classList.remove("hidden");
    return;
  }

  const inputValue = searchInput.value.toLowerCase();

  getPokePromise("pokemon", inputValue).then((response) => {
    if (response) {
      createCard(response, ".main--container--cards");
    } else {
      fetch("./not-found.html")
        .then((result) => result.text())
        .then((text) => {
          errorContainer.innerHTML = text;
        });
    }
  });
}

searchInput.addEventListener("change", handleChange);

getPokeData(pokemonLoadNumber, pokemonOffsetNumber);
