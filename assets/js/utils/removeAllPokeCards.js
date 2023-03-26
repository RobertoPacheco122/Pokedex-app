function removeAllPokeCards(pokeCardsClass) {
  const cardsList = document.querySelectorAll(pokeCardsClass);
  cardsList.forEach((card) => {
    card.remove();
  });
}

export default removeAllPokeCards;
