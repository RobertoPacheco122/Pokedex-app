function getPokeLink(pokeID) {
  return `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
}

function getPokePromises() {
  return Array(9)
    .fill()
    .map((promise, index) =>
      fetch(getPokeLink(index + 1)).then((pokeData) => pokeData.json())
    );
}

function createPokeObject(pokemon) {
  return {
    name: pokemon.name,
    id: pokemon.id,
    pixelSprite: pokemon.sprites.front_default,
    officialSprite: pokemon.sprites.other["official-artwork"].front_default,
    types: pokemon.types.map((item) => item.type.name),
  };
}

function createPokeCardTypesHTML(pokemonType) {
  if (pokemonType)
    return `
      <span class="main__types--poke">
      <i class="main__icon--type icon icon--${pokemonType}"></i>
        ${pokemonType}
      </span>
    `;
  return "";
}

function createPokeCardHTML(pokemon) {
  return `
    <div class="main--container--pokename">
      <h2 class="main__name--poke">${pokemon.name}</h2>
      <span class="main__id--poke">#${pokemon.id}</span>
    </div>
    <div class="main--container--pokeinfos">
      <div class="main--container--pokecontent">
        ${createPokeCardTypesHTML(pokemon.types[0])}
        ${createPokeCardTypesHTML(pokemon.types[1])}
      </div>
      <div class="main--container--pokeimage">
        <img src="${pokemon.officialSprite}" alt="" class="main__image--poke">
        <img src="./assets/img/pokeball.png" alt="" class="main__image--pokeball">
      </div>
    </div>
  `;
}

function createPokesCard(pokemonData, containerClass) {
  const fatherContainer = document.querySelector(containerClass);

  pokemonData.forEach((pokemon) => {
    const pokeCard = document.createElement("div");
    const poke = createPokeObject(pokemon);

    pokeCard.classList.add("main--container--poke", poke.types[0]);
    pokeCard.innerHTML = createPokeCardHTML(poke);

    fatherContainer.appendChild(pokeCard);
  });
}

async function getPokeData() {
  const allPokesPromises = await getPokePromises();
  const allPokesData = await Promise.all(allPokesPromises);

  createPokesCard(allPokesData, ".main--container--cards");
}

getPokeData();
