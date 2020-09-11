// мобильное меню
const menuBtn = document.querySelector(".page-header__toggle");
const menu = document.querySelector(".main-nav");
const logo = document.querySelector(".page-header__logo");


logo.classList.remove("page-header__logo--nojs");
menuBtn.classList.remove("page-header__toggle--nojs");
menu.classList.remove("main-nav--show");

menuBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.toggle("main-nav--show");
  logo.classList.toggle("page-header__logo--nojs");
  menuBtn.classList.toggle("page-header__toggle--open");
  menuBtn.classList.toggle("page-header__toggle--close");
});

// счетчик лайков
const likes = document.querySelectorAll(".photos__like");
for (let i = 0; i < likes.length; i++) {
  likes[i].addEventListener("click", function (evt) {
    let counter = Number(likes[i].nextElementSibling.textContent);
    if (likes[i].classList.contains("added")) {
      counter--;
    } else {
      counter++;
    }
    likes[i].classList.toggle("added");
    likes[i].nextElementSibling.textContent = counter;
  })
};

// Карта
ymaps.ready(function () {
  const myMap = new ymaps.Map("map", {
      center: [34.92774685612593, -111.69560981416403],
      zoom: 7,
      controls: []
    }, {
      suppressMapOpenBlock: true
    }, {
      searchControlProvider: "yandex#search"
    }),
    myPlacemark = new ymaps.Placemark(([34.92774685612593, -111.69560981416403]), {}, {
      iconLayout: "default#image",
      iconImageHref: "img/icon-map-marker.svg",
      iconImageSize: [27, 27],
      iconImageOffset: [0, 0]
    });
  myMap.geoObjects.add(myPlacemark);
});
