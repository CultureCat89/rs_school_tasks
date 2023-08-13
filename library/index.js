console.log("1. Вёрстка соответствует макету. Ширина экрана 768px +26");
console.log("2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12");
console.log("3. На ширине экрана 768рх реализовано адаптивное меню +11.");
console.log("Не смог реализовать скрытие бургер-меню при клике вне его области, поэтому только 11 баллов, а не 12. Кто подскажет реализацию, буду благодарен:)")


const open_burger = document.querySelector("#burger_menu_open");
const close_burger = document.querySelector("#burger_menu_close");

const menu = document.querySelector("#open_burger_menu")
const burger_nav = document.querySelector("#burger_nav")
const links = document.querySelector("#list_nav").cloneNode(1);

const burger_links = Array.from(links.children);
const menu_links = Array.from(document.querySelector("#list_nav").children);

burger_nav.appendChild(links);

open_burger.addEventListener("click", burgerOpener);
close_burger.addEventListener("click", burgerCloser);


burger_links.forEach((link) => {
  link.addEventListener("click", burgerCloser);
});

menu_links.forEach((link) => {
  link.addEventListener("click", burgerCloser);
});

document.body.addEventListener("click", menu.classList.remove("clicked"));


function burgerOpener(e) {
  e.preventDefault();

  menu.classList.toggle("clicked");
}

function burgerCloser() {
  if (!menu.classList.contains("clicked")) {
    return;
  }
  menu.classList.remove("clicked");
}