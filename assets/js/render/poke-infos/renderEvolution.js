export default function renderEvolutionSection(pokemon) {
  const section = document.createElement("section");
  section.classList.add("poke__section", "poke__section--evolution");
  section.innerHTML = `
    <h2 class="poke__subtitle bold">Evolution Chain</h2>

    <section class="poke--container--chains">
      <div class="poke--chain">
        <div class="poke--chain--from">
          <div class="poke--chain--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" class="poke__image--chain">
          </div>
          <div class="poke--chain--content">
            <span>Bulbasaur</span>
          </div>
        </div>
        <div class="poke--chain--middle">
          <i class="poke--chain__icon icon icon--arrow"></i>
          <span>Lvl 16</span>
        </div>
        <div class="poke--chain--to">
          <div class="poke--chain--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" alt="" class="poke__image--chain">
          </div>
          <div class="poke--chain--content">
            <span>Ivysaur</span>
          </div>
        </div>
      </div>
      <div class="poke--chain">
        <div class="poke--chain--from">
          <div class="poke--chain--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" alt="" class="poke__image--chain">
          </div>
          <div class="poke--chain--content">
            <span>Ivysayr</span>
          </div>
        </div>
        <div class="poke--chain--middle">
          <i class="poke--chain__icon icon icon--arrow"></i>
          <span>Lvl 34</span>
        </div>
        <div class="poke--chain--to">
          <div class="poke--chain--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="" class="poke__image--chain">
          </div>
          <div class="poke--chain--content">
            <span>Venosaur</span>
          </div>
        </div>
      </div>
    </section>
  `;

  return section;
}
