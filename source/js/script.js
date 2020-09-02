// Карта
ymaps.ready(function () {
  const myMap = new ymaps.Map('map', {
      center: [34.92774685612593,-111.69560981416403],
      zoom: 7,
      controls: []
    }, {
      suppressMapOpenBlock: true
    }, {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark(([34.92774685612593,-111.69560981416403]), {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map-marker.svg',
      iconImageSize: [27, 27],
      iconImageOffset: [0, 0]
    });
  myMap.geoObjects.add(myPlacemark);
});

// мобильное меню


