import getLink from "./getPokeLink.js";

function getPromises(quantity, offset) {
  return Array(quantity)
    .fill()
    .map(() =>
      fetch(getLink("pokemon", (offset += 1))).then((pokeData) =>
        pokeData.json()
      )
    );
}

export default getPromises;
