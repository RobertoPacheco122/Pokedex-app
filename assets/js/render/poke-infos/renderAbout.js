export default function renderAboutSection(pokemon, pokemonSpecies) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--about");

  const genderEighths = 8;
  const pokemonMaleEighths = pokemonSpecies.genderRate;
  let pokemonMalePercentage;
  let pokemonFemalePercentage;

  if (pokemonMaleEighths === -1) {
    pokemonMalePercentage = 100;
    pokemonFemalePercentage = 0;
  } else {
    pokemonMalePercentage =
      ((genderEighths - pokemonSpecies.genderRate) / genderEighths) * 100;
    pokemonFemalePercentage = (pokemonSpecies.genderRate / genderEighths) * 100;
  }

  section.innerHTML = `
    <p class="poke__text">${pokemonSpecies.flavorText}</p>

    <div class="poke--container--table">
      <table class="poke__table">
        <thead class="poke__thead">
          <tr class="poke__row">
            <th class="poke__cell--thead">Height</th>
            <th class="poke__cell--thead">Weight</th>
          </tr>
          <tr class="poke__row">
            <td class="poke__cell">${pokemon.height / 10} m</td>
            <td class="poke__cell">${pokemon.weight / 10} kg</td>
          </tr>
        </thead>
      </table>
    </div>

    <h2 class="poke__subtitle bold">Breeding</h2>
    <p class="poke__text">
      <span class="grey--text">Gender: </span> ♂ ${pokemonMalePercentage}% ♀ ${pokemonFemalePercentage}%
    </p>
    <p class="poke__text">
      <span class="grey--text">Egg Groups: </span><span class="poke__text--eggGroups capitalize">${
        pokemonSpecies.eggGroups
      }</span>
    </p>
  `;
  return section;
}
