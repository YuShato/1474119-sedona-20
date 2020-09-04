// Карта
ymaps.ready(function () {
  const myMap = new ymaps.Map('map', {
      center: [34.92774685612593, -111.69560981416403],
      zoom: 7,
      controls: []
    }, {
      suppressMapOpenBlock: true
    }, {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark(([34.92774685612593, -111.69560981416403]), {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map-marker.svg',
      iconImageSize: [27, 27],
      iconImageOffset: [0, 0]
    });
  myMap.geoObjects.add(myPlacemark);
});

// мобильное меню
const menuBtn = document.querySelector('.main-nav__toggle');
const menu = document.querySelector('.main-nav');
const logo = document.querySelector('.page-header__logo');


logo.classList.remove('page-header__logo--nojs');
menu.classList.remove('main-nav--show');

menuBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  menu.classList.toggle('main-nav--show');
  logo.classList.toggle('page-header__logo--nojs');
  menuBtn.classList.toggle('main-nav__toggle--open');
  menuBtn.classList.toggle('main-nav__toggle--close');
});
