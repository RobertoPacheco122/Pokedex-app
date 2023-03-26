function getLink(resource, pokeIdOrName) {
  return `https://pokeapi.co/api/v2/${resource}/${pokeIdOrName}`;
}

export default getLink;
