import getPromises from "./getPokePromises.js";
import { createCards } from "../render/index/renderCard.js";

async function getData(quantity, offset) {
  const allPokesPromises = getPromises(quantity, offset);
  const allPokesData = await Promise.all(allPokesPromises);
  createCards(allPokesData, ".main--container--cards");
}

export default getData;
