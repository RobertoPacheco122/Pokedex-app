export default function renderAboutSection(pokemon) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--about");
  section.innerHTML = `
    <p class="poke__text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus pharetra quam non sollicitudin. Ut quis sem lacinia, dapibus turpis vitae, ultricies nulla. Sed feugiat est nec erat condimentum, a tempus tellus posuere.
    </p>

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
      <span class="grey--text">Gender: </span> ♂ 87.5% ♀ 12.5%
    </p>
    <p class="poke__text">
      <span class="grey--text">Egg Groups: </span>Monster
    </p>
    <p class="poke__text">
      <span class="grey--text">Egg Cycle: </span>Grass
    </p>
  `;
  return section;
}
