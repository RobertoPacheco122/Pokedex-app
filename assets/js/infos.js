import Pokemon from "./modules/Pokemon.js";

export function createPokeInfos(pokemon) {
  return `
  <div class="poke--container--name">
    <h1 class="poke__name">${pokemon.name}</h1>
    <span class="poke__id">#${pokemon.id}</span>
  </div>
  <div class="poke--container--type">
    <ul class="poke__list--type">
      ${Pokemon.createCardTypesHTML(pokemon.types[0])}
      ${Pokemon.createCardTypesHTML(pokemon.types[1])}
    </ul>
  </div>
  <div class="poke--container--image">
    <img src="${pokemon.pixelSprite}" alt="" class="poke__image">
    <img src="assets/img/pokeball.png" alt="" class="poke__image--ball">
  </div>
  `;
}

export function createPokeHeightWeightTableHTML(pokemon) {
  return `
  <table class="poke__table">
    <thead class="poke__thead">
      <tr class="poke__row">
        <th class="poke__cell--thead">Height</th>
        <th class="poke__cell--thead">Weight</th>
      </tr>
      <tr class="poke__row">
        <td class="poke__cell">${Pokemon.convertHeightToCentimeters(
          pokemon.height
        )} cm</td>
        <td class="poke__cell">${Pokemon.convertWeightToKilograms(
          pokemon.weight
        )} Kg</td>
      </tr>
    </thead>
  </table>
  `;
}

export default async function createInfosHTML(pokemonID) {
  const pokePromise = await Pokemon.getPromise(pokemonID);
  const pokemon = Pokemon.createObject(pokePromise);

  const infos = document.querySelector(".poke--container--infos");
  const table = document.querySelector(".poke--container--table");
  const body = document.querySelector("body");

  body.classList.add(pokemon.types[0]);

  infos.innerHTML = createPokeInfos(pokemon);
  table.innerHTML = createPokeHeightWeightTableHTML(pokemon);
}
