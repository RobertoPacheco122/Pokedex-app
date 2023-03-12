export default function tabNav(linksClass, sectionsClass) {
  const links = document.querySelectorAll(linksClass);
  const sections = document.querySelectorAll(sectionsClass);

  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      links.forEach((linkOutside) => {
        linkOutside.classList.remove("link--active");
      });
      sections.forEach((section) => {
        section.classList.add("hidden");
      });
      event.currentTarget.classList.add("link--active");
      sections[index].classList.remove("hidden");
    });
  });

  links[0].classList.toggle("link--active");
  sections[0].classList.remove("hidden");
}
