function createSpeciesObject(pokemonSpeciesData) {
  return {
    flavorText: pokemonSpeciesData.flavor_text_entries[8].flavor_text,
    eggGroups: pokemonSpeciesData.egg_groups.map((egg) => egg.name),
    evolutionChainURL: pokemonSpeciesData.evolution_chain.url,
    genderRate: pokemonSpeciesData.gender_rate,
  };
}

export default createSpeciesObject;
