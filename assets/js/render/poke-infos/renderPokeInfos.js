import renderSummarySection from "./renderSummary.js";
import renderAboutSection from "./renderAbout.js";
import renderBaseStatsSection from "./renderBaseStats.js";
import renderEvolutionSection from "./renderEvolution.js";
import renderAbilitiesSection from "./renderAbilities.js";

export default function renderPokeInfos(summaryClass, sectionsClass, pokemon) {
  const summary = document.querySelector(summaryClass);
  const sections = document.querySelector(sectionsClass);

  summary.innerHTML = renderSummarySection(pokemon);
  sections.appendChild(renderAboutSection(pokemon));
  sections.appendChild(renderBaseStatsSection(pokemon));
  sections.appendChild(renderEvolutionSection(pokemon));
  sections.appendChild(renderAbilitiesSection(pokemon));
}
