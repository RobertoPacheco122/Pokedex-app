import Pokemon from "./modules/Pokemon.js";

const form = document.querySelector(".main__form");
const searchInput = document.querySelector("#pokename");
const loadPokesButton = document.querySelector(".main__button--load");
const pokemonLoadNumber = 20;
let pokemonOffsetNumber = 0;

loadPokesButton.addEventListener("click", () => {
  pokemonOffsetNumber += pokemonLoadNumber;

  Pokemon.getData(pokemonLoadNumber, pokemonOffsetNumber);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function removeAllPokeCards(pokeCardsClass) {
  const cardsList = document.querySelectorAll(pokeCardsClass);
  cardsList.forEach((card) => {
    card.remove();
  });
}

function handleChange(event) {
  event.preventDefault();
  const errorContainer = document.querySelector(".error--container");
  removeAllPokeCards(".main--container--poke");
  if (!loadPokesButton.classList.contains("hidden")) {
    loadPokesButton.classList.add("hidden");
  }

  if (searchInput.value === "") {
    pokemonOffsetNumber = 0;
    Pokemon.getData(pokemonLoadNumber, pokemonOffsetNumber);
    errorContainer.innerHTML = "";
    loadPokesButton.classList.remove("hidden");
    return;
  }

  const inputValue = searchInput.value.toLowerCase();

  Pokemon.getPromise("pokemon", inputValue).then((response) => {
    if (response) {
      Pokemon.createCard(response, ".main--container--cards");
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

Pokemon.getData(pokemonLoadNumber, pokemonOffsetNumber);
