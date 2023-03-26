import renderCardTypes from "../renderCardTypes.js";
import createPokeObject from "../../utils/createPokeObject.js";
import addCardEvent from "../../process/addCardEvent.js";

function createCardHTML(pokemon) {
  return `
  <div class="main--container--pokename">
    <h2 class="main__name--poke capitalize bold">${pokemon.name}</h2>
    <span class="main__id--poke">#${pokemon.id}</span>
  </div>
  <div class="main--container--pokeinfos">
    <div class="main--container--pokecontent">
      ${renderCardTypes(pokemon.types[0])}
      ${renderCardTypes(pokemon.types[1])}
    </div>
    <div class="main--container--pokeimage">
      <img src="${pokemon.officialSprite}" alt="" class="main__image--poke">
      <img src="./assets/img/pokeball.png" alt="" class="main__image--pokeball">
    </div>
  </div>
  `;
}

function createPokeListItem(pokemonData) {
  const pokeListItem = document.createElement("div");
  const poke = createPokeObject(pokemonData);
  pokeListItem.classList.add("main--container--poke", poke.types[0]);
  pokeListItem.innerHTML = createCardHTML(poke);
  addCardEvent(pokeListItem);
  return pokeListItem;
}

export function createCards(pokemonData, containerClass) {
  const fatherContainer = document.querySelector(containerClass);

  pokemonData.forEach((pokemon) => {
    const pokeItem = createPokeListItem(pokemon);
    fatherContainer.appendChild(pokeItem);
  });
}

export function createCard(pokemonData, containerClass) {
  const fatherContainer = document.querySelector(containerClass);
  const pokeItem = createPokeListItem(pokemonData);
  fatherContainer.appendChild(pokeItem);
}
