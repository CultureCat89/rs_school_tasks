
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

// SLIDER FOR BOOKS

const radioButtons = document.querySelectorAll('input[name="season"]');
const seasonBooks = document.querySelectorAll('.favorite_items');

for (let key of radioButtons) {
  key.addEventListener('change', changeSeason);
}

function changeSeason(e) {
  if (!this.checked) {
    return;
  }
  activeSeasonId = this.id;
  document.querySelector('.visible_effect').classList.remove('visible_effect');
  document.querySelector('.favorite_' + activeSeasonId).classList.add('visible_effect');
}

// SLIDER FOR IMAGES
const pagination_desktop = document.querySelector("#pagination");
const buttons_desktop = pagination_desktop.querySelectorAll(".svg");
let active_button = pagination_desktop.querySelector(".btn-on");
let scroll_position = document.querySelector(".images_items");
let image_width = scroll_position.querySelector("img");

btn_slider(buttons_desktop, active_button);


// SLIDER FOR IMAGES TABLET

const pagination_tablet = document.querySelector("#pagination_tablet");
const buttons_tablet = pagination_tablet.querySelectorAll(".svg");
const arrowIcons = document.querySelectorAll(".images_items_tablet svg");
const scroll_position_tablet = document.querySelector(".images_items_tablet_wrapper");
const image_tablet_width = scroll_position_tablet.querySelector("img");
let active_btn_tablet = pagination_tablet.querySelector(".btn-on");
arrowIcons[0].style.display = "none";

arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon === arrowIcons[1]) {
      active_btn_tablet.classList.remove("btn-on");
      let next_btn = active_btn_tablet.nextElementSibling;
      next_btn.classList.add('btn-on');
      active_btn_tablet = next_btn;
      arrowIcons[0].style.display = "";
      scroll_position_tablet.scrollLeft += 450;
      if (Math.ceil(scroll_position_tablet.scrollLeft) >= 1350) {
        arrowIcons[1].style.display = "none";
      }
    } else {
      active_btn_tablet.classList.remove("btn-on");
      let prev_btn = active_btn_tablet.previousElementSibling;
      prev_btn.classList.add('btn-on');
      active_btn_tablet = prev_btn;
      arrowIcons[1].style.display = "";
      scroll_position_tablet.scrollLeft -=  450;
      if (Math.ceil(scroll_position_tablet.scrollLeft) <= 450) {
        arrowIcons[0].style.display = "none";
      }
    }
    })
  }
)



buttons_tablet.forEach(icon => {
    icon.addEventListener('click', () => {
      active_btn_tablet.classList.remove("btn-on");
      active_btn_tablet.removeAttribute('disabled');
      icon.classList.add("btn-on");
      icon.setAttribute('disabled', '');
      active_btn_tablet = icon;
      switch (Array.from(buttons_tablet).indexOf(active_btn_tablet)) {
        case 0: {
          scroll_position_tablet.scrollLeft = 0;
          arrowIcons[0].style.display = "none";
          arrowIcons[1].style.display = "";
          break;
        }
        case 1: {
          scroll_position_tablet.scrollLeft = image_tablet_width.clientWidth;
          arrowIcons[0].style.display = "";
          arrowIcons[1].style.display = "";
          break;
        }
        case 2: {
          scroll_position_tablet.scrollLeft = image_tablet_width.clientWidth * 2;
          arrowIcons[0].style.display = "";
          arrowIcons[1].style.display = "";
          break;
        }
        case 3: {
          scroll_position_tablet.scrollLeft = image_tablet_width.clientWidth * 3;
          arrowIcons[0].style.display = "";
          arrowIcons[1].style.display = "";
          break;
        }
        case 4: {
          scroll_position_tablet.scrollLeft = image_tablet_width.clientWidth * 4;
          arrowIcons[0].style.display = "";
          arrowIcons[1].style.display = "none";
        }
      };
    });
  });

function btn_slider(buttons, active_btn) {
  buttons.forEach(icon => {
    icon.addEventListener('click', () => {
      active_btn.classList.remove("btn-on");
      active_btn.removeAttribute('disabled');
      icon.classList.add("btn-on");
      icon.setAttribute('disabled', '');
      active_btn = icon;
      switch (Array.from(buttons).indexOf(active_btn)) {
        case 0: {
          scroll_position.scrollLeft = 0;
          break;
        }
        case 1: {
          scroll_position.scrollLeft = image_width.clientWidth + 25;
          break;
        }
        case 2: {
          scroll_position.scrollLeft = (image_width.clientWidth + 25) * 2;
        }
      };
    });
  });
}

const books_btn = document.querySelectorAll(".book button");

books_btn.forEach(elem => {
  elem.addEventListener('click', () => {
    elem.innerHTML = "Own";
    elem.classList.add("own");
    elem.setAttribute("disabled", '')
  })
})