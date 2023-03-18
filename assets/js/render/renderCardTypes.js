export default function renderCardTypes(pokemonType) {
  if (pokemonType)
    return `
      <span class="main__types--poke capitalize">
      <i class="main__icon--type icon icon--${pokemonType}"></i>
      ${pokemonType}
      </span>
    `;
  return "";
}
