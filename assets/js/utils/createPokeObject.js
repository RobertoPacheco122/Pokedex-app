function createObject(pokemon) {
  return {
    name: pokemon.name,
    id: pokemon.id,
    officialSprite: pokemon.sprites.other["official-artwork"].front_default,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((item) => item.type.name),
    stats: pokemon.stats.map((stat) => [
      {
        name: stat.stat.name,
        stat: stat.base_stat,
      },
    ]),
    abilities: pokemon.abilities.map((item) => item.ability.name),
  };
}

export default createObject;
