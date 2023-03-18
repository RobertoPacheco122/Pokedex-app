export default function renderAbilitiesSection(pokemon) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--moves");
  section.innerHTML = `
    <h2 class="poke__subtitle bold">Abilities</h2>
    <p class="poke__text capitalize">${pokemon.abilities}</p>
  `;

  return section;
}
