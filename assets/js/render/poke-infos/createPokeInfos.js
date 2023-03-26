import renderPokeInfos from "./renderPokeInfos.js";
import getPokePromise from "../../utils/getPokePromise.js";
import createPokeObject from "../../utils/createPokeObject.js";
import createPokeSpeciesObject from "../../utils/createPokeSpeciesObject.js";
import initTabNav from "../../utils/tabNav.js";

async function createInfosHTML(pokemonID) {
  const pokemonData = await getPokePromise("pokemon", pokemonID);
  const pokemonSpeciesData = await getPokePromise("pokemon-species", pokemonID);
  const pokemon = createPokeObject(pokemonData);
  const pokemonSpecies = createPokeSpeciesObject(pokemonSpeciesData);

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

export default createInfosHTML;
