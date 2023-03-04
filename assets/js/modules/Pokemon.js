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

  static getPromise(pokeID) {
    return fetch(Pokemon.getLink(pokeID)).then((response) => response.json());
  }

  static createObject(pokemon) {
    return {
      name: pokemon.name,
      id: pokemon.id,
      pixelSprite: pokemon.sprites.front_default,
      officialSprite: pokemon.sprites.other["official-artwork"].front_default,
      types: pokemon.types.map((item) => item.type.name),
    };
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
      <h2 class="main__name--poke">${pokemon.name}</h2>
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

  static createCards(pokemonData, containerClass) {
    const fatherContainer = document.querySelector(containerClass);

    pokemonData.forEach((pokemon) => {
      const pokeCard = document.createElement("div");
      const poke = Pokemon.createObject(pokemon);
      pokeCard.classList.add("main--container--poke", poke.types[0]);
      pokeCard.innerHTML = Pokemon.createCardHTML(poke);
      fatherContainer.appendChild(pokeCard);
    });
  }

  static async getData(quantity) {
    const allPokesPromises = Pokemon.getPromises(quantity);
    const allPokesData = await Promise.all(allPokesPromises);
    Pokemon.createCards(allPokesData, ".main--container--cards");
  }
}
