async function getEvolutionChainInfo(evolutionChain, evolutionChainArray) {
  if (evolutionChain.evolves_to[0]) {
    getEvolutionChainInfo(evolutionChain.evolves_to[0], evolutionChainArray);
  }

  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${evolutionChain.species.name}`
  );
  const pokemonObject = await pokemonData.json();
  const pokemonPixelSprite = await pokemonObject.sprites.front_default;
  const pokemonOficialSprite = await pokemonObject.sprites.other[
    "official-artwork"
  ].front_default;

  evolutionChainArray.push({
    name: evolutionChain.species.name,
    url: evolutionChain.species.url,
    evolutionDetails: evolutionChain.evolution_details[0],
    pixelSprite: pokemonPixelSprite,
    oficialSprite: pokemonOficialSprite,
  });
}

function renderPokeChain(
  actualPokeName,
  actualPokeSprite,
  nextPokeLevel,
  nextPokeName,
  nextPokeSprite
) {
  return `
    <div class="poke--chain--from">
      <div class="poke--chain--image">
        <img src="${actualPokeSprite}" alt="" class="poke__image--chain">
      </div>
      <div class="poke--chain--content">
        <span class="poke--chain--name capitalize">${actualPokeName}</span>
      </div>
    </div>
    <div class="poke--chain--middle">
      <i class="poke--chain__icon icon icon--arrow"></i>
      <span>Lvl ${nextPokeLevel}</span>
    </div>
    <div class="poke--chain--to">
      <div class="poke--chain--image">
        <img src="${nextPokeSprite}" alt="" class="poke__image--chain">
      </div>
      <div class="poke--chain--content">
        <span class="poke--chain--name capitalize">${nextPokeName}</span>
      </div>
    </div>
  `;
}

export async function createEvolutionChain(pokemonSpecies) {
  const evolutionData = await fetch(pokemonSpecies.evolutionChainURL);
  const evolutionObject = await evolutionData.json();
  const evolutionChainArray = [];
  const chainsSection = document.createElement("section");
  chainsSection.classList.add("poke--container--chains");

  await getEvolutionChainInfo(evolutionObject.chain, evolutionChainArray);
  evolutionChainArray.reverse();

  for (let i = 0; i < evolutionChainArray.length - 1; i += 1) {
    const chainElementDiv = document.createElement("div");
    chainElementDiv.classList.add("poke--chain");
    chainElementDiv.innerHTML = renderPokeChain(
      evolutionChainArray[i].name,
      evolutionChainArray[i].pixelSprite,
      evolutionChainArray[i + 1].evolutionDetails.min_level,
      evolutionChainArray[i + 1].name,
      evolutionChainArray[i + 1].pixelSprite
    );

    chainsSection.appendChild(chainElementDiv);
  }

  return chainsSection;
}

export default async function renderEvolutionSection(pokemonSpecies) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--evolution");
  section.innerHTML = `<h2 class="poke__subtitle bold">Evolution Chain</h2>`;
  section.appendChild(await createEvolutionChain(pokemonSpecies));

  return section;
}
