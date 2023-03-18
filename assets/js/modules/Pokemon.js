import renderPokeInfos from "../render/poke-infos/renderPokeInfos.js";
import renderCardTypes from "../render/renderCardTypes.js";
import initTabNav from "../utils/tabNav.js";

export default class Pokemon {
  static getLink(resource, pokeIdOrName) {
    return `https://pokeapi.co/api/v2/${resource}/${pokeIdOrName}`;
  }

  static getPromises(quantity, offset) {
    return Array(quantity)
      .fill()
      .map(() =>
        fetch(Pokemon.getLink("pokemon", (offset += 1))).then((pokeData) =>
          pokeData.json()
        )
      );
  }

  static async getPromise(resource, pokeIdOrName) {
    const pokePromise = await fetch(Pokemon.getLink(resource, pokeIdOrName));
    if (pokePromise.ok) {
      return pokePromise.json();
    }
    return false;
  }

  static createObject(pokemon) {
    return {
      name: pokemon.name,
      id: pokemon.id,
      pixelSprite: pokemon.sprites.front_default,
      officialSprite: pokemon.sprites.other["official-artwork"].front_default,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((item) => item.type.name),
      stats: pokemon.stats.map((stat) => [
        {
          name: stat.stat.name,
          stat: stat.base_stat,
        },
      ]),
      abilities: pokemon.abilities.map((item) => item.ability.name),
    };
  }

  static createSpeciesObject(pokemonSpeciesData) {
    return {
      flavorText: pokemonSpeciesData.flavor_text_entries[8].flavor_text,
      eggGroups: pokemonSpeciesData.egg_groups.map((egg) => egg.name),
      evolutionChainURL: pokemonSpeciesData.evolution_chain.url,
      genderRate: pokemonSpeciesData.gender_rate,
    };
  }

  static createCardHTML(pokemon) {
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

  static addCardEvent(card) {
    card.addEventListener("click", (event) => {
      const pageContainer = document.querySelector(".page");
      const pokemonID = event.currentTarget
        .querySelector(".main__id--poke")
        .innerText.replace("#", "");

      fetch("./poke-infos.html")
        .then((response) => response.text())
        .then((text) => {
          pageContainer.innerHTML = text;
        })
        .then(() => Pokemon.createInfosHTML(pokemonID));
    });
  }

  static createPokeListItem(pokemonData) {
    const pokeListItem = document.createElement("div");
    const poke = Pokemon.createObject(pokemonData);
    pokeListItem.classList.add("main--container--poke", poke.types[0]);
    pokeListItem.innerHTML = Pokemon.createCardHTML(poke);
    Pokemon.addCardEvent(pokeListItem);
    return pokeListItem;
  }

  static createCards(pokemonData, containerClass) {
    const fatherContainer = document.querySelector(containerClass);

    pokemonData.forEach((pokemon) => {
      const pokeItem = Pokemon.createPokeListItem(pokemon);
      fatherContainer.appendChild(pokeItem);
    });
  }

  static createCard(pokemonData, containerClass) {
    const fatherContainer = document.querySelector(containerClass);
    const pokeItem = Pokemon.createPokeListItem(pokemonData);
    fatherContainer.appendChild(pokeItem);
  }

  static async createInfosHTML(pokemonID) {
    const pokemonData = await Pokemon.getPromise("pokemon", pokemonID);
    const pokemonSpeciesData = await Pokemon.getPromise(
      "pokemon-species",
      pokemonID
    );
    const pokemon = Pokemon.createObject(pokemonData);
    const pokemonSpecies = Pokemon.createSpeciesObject(pokemonSpeciesData);

    const body = document.querySelector("body");
    body.classList.add(pokemon.types[0]);

    await renderPokeInfos(
      ".poke--container--infos",
      ".poke--container--sections",
      pokemon,
      pokemonSpecies
    );
    initTabNav(".poke__link", ".poke__section");
  }

  static async getData(quantity, offset) {
    const allPokesPromises = Pokemon.getPromises(quantity, offset);
    const allPokesData = await Promise.all(allPokesPromises);
    Pokemon.createCards(allPokesData, ".main--container--cards");
  }
}
