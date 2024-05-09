initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 30
            }
        }
    );

    var textInput = document.getElementById("search");
    var searchButton = document.getElementById("search_button");
    searchButton.onclick = function(event) {
            console.log('here')
            ymaps3.search({
                'text': textInput.value
            }).then(function (res) {
                console.log(res[0])
            })
    };


    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
}


