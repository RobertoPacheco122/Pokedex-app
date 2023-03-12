import renderSummarySection from "./renderSummary.js";
import renderAboutSection from "./renderAbout.js";
import renderBaseStatsSection from "./renderBaseStats.js";
import renderEvolutionSection from "./renderEvolution.js";
import renderAbilitiesSection from "./renderAbilities.js";

export default async function renderPokeInfos(
  summaryClass,
  sectionsClass,
  pokemon,
  pokemonSpecies
) {
  const summary = document.querySelector(summaryClass);
  const sections = document.querySelector(sectionsClass);

  summary.innerHTML = renderSummarySection(pokemon);
  sections.appendChild(renderAboutSection(pokemon, pokemonSpecies));
  sections.appendChild(renderBaseStatsSection(pokemon));
  sections.appendChild(await renderEvolutionSection(pokemonSpecies));
  sections.appendChild(renderAbilitiesSection(pokemon));
}
