import Pokemon from "./modules/Pokemon.js";

const form = document.querySelector(".main__form");
const searchInput = document.querySelector("#pokename");

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
  removeAllPokeCards(".main--container--poke");
  const errorContainer = document.querySelector(".error--container");

  if (searchInput.value === "") {
    Pokemon.getData(3);
    errorContainer.innerHTML = "";
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

Pokemon.getData(3);
