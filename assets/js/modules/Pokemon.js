export default class Pokemon {
  static getLink(option) {
    return `https://pokeapi.co/api/v2/pokemon/${option}`;
  }

  static getPromises(quantity) {
    return Array(quantity)
      .fill()
      .map((_, index) =>
        fetch(Pokemon.getLink(index + 1)).then((pokeData) => pokeData.json())
      );
  }

  static async getPromise(pokeID) {
    const pokePromise = await fetch(Pokemon.getLink(pokeID));
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
    };
  }

  static convertHeightToCentimeters(height) {
    return height * 10;
  }

  static convertWeightToKilograms(weight) {
    return weight / 10;
  }

  static createCardTypesHTML(pokemonType) {
    if (pokemonType)
      return `
        <span class="main__types--poke">
        <i class="main__icon--type icon icon--${pokemonType}"></i>
        ${pokemonType}
        </span>
      `;
    return "";
  }

  static createCardHTML(pokemon) {
    return `
    <div class="main--container--pokename">
      <h2 class="main__name--poke bold">${pokemon.name}</h2>
      <span class="main__id--poke">#${pokemon.id}</span>
    </div>
    <div class="main--container--pokeinfos">
      <div class="main--container--pokecontent">
        ${Pokemon.createCardTypesHTML(pokemon.types[0])}
        ${Pokemon.createCardTypesHTML(pokemon.types[1])}
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

  static createInfos(pokemon) {
    return `
    <div class="poke--container--name">
      <h1 class="poke__name bold">${pokemon.name}</h1>
      <span class="poke__id bold">#${pokemon.id}</span>
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

  static createHeightWeightTableHTML(pokemon) {
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

  static createInfosHTML(pokemonID) {
    Pokemon.getPromise(pokemonID).then((response) => {
      const pokemon = Pokemon.createObject(response);
      const infos = document.querySelector(".poke--container--infos");
      const table = document.querySelector(".poke--container--table");
      const body = document.querySelector("body");
      body.classList.add(pokemon.types[0]);

      infos.innerHTML = Pokemon.createInfos(pokemon);
      table.innerHTML = Pokemon.createHeightWeightTableHTML(pokemon);
    });
  }

  static async getData(quantity) {
    const allPokesPromises = Pokemon.getPromises(quantity);
    const allPokesData = await Promise.all(allPokesPromises);
    Pokemon.createCards(allPokesData, ".main--container--cards");
  }
}
