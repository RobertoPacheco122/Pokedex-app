import getLink from "./getPokeLink.js";

async function getPromise(resource, pokeIdOrName) {
  const pokePromise = await fetch(getLink(resource, pokeIdOrName));
  if (pokePromise.ok) {
    return pokePromise.json();
  }
  return false;
}

export default getPromise;
