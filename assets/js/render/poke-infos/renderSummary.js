import renderCardTypes from "../renderCardTypes.js";

export default function renderSummarySection(pokemon) {
  return `
    <div class="poke--container--name">
      <h1 class="poke__name capitalize bold">${pokemon.name}</h1>
      <span class="poke__id bold">#${pokemon.id}</span>
    </div>
    <div class="poke--container--type">
      <ul class="poke__list--type">
        ${renderCardTypes(pokemon.types[0])}
        ${renderCardTypes(pokemon.types[1])}
      </ul>
    </div>
    <div class="poke--container--image">
      <img src="${pokemon.officialSprite}" alt="" class="poke__image">
      <img src="assets/img/pokeball.png" alt="" class="poke__image--ball">
    </div>
  `;
}
