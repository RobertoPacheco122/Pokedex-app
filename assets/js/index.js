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

  if (searchInput.value === "") {
    Pokemon.getData(30);
    return;
  }

  const inputValue = searchInput.value.toLowerCase();

  try {
    Pokemon.getPromise(inputValue).then((pokeObject) =>
      Pokemon.createCard(pokeObject, ".main--container--cards")
    );
  } catch {
    console.log("deu ruim meu chapão");
  }
}

searchInput.addEventListener("change", handleChange);

Pokemon.getData(30);
