function createStatsContent(statsArray) {
  const statusList = document.createElement("ul");
  statusList.classList.add("poke__list--stats");

  statsArray.forEach((stats) => {
    const statusItem = document.createElement("li");
    statusItem.classList.add("poke__item--stats");

    statusItem.innerHTML = `
      <span class="poke__stats--name capitalize grey--text">${stats[0].name}:</span> 
      <span class="poke__stats--value">${stats[0].stat}</span> 
    `;
    statusList.appendChild(statusItem);
  });

  return statusList;
}

export default function renderBaseStatsSection(pokemon) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--stats");
  section.innerHTML = `<h2 class="poke__subtitle bold">Stats</h2>`;
  section.appendChild(createStatsContent(pokemon.stats));

  return section;
}
