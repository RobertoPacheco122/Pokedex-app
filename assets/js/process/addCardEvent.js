import createPokeInfos from "../render/poke-infos/createPokeInfos.js";

function addCardEvent(card) {
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
      .then(() => createPokeInfos(pokemonID));
  });
}

export default addCardEvent;
